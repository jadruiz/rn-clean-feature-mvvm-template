// src/infrastructure/data/repositories/DrizzleUserRepository.ts
import { IUserRepository } from '@domain/repositories/IUserRepository';
import { User, UserStatus, NewUserData } from '@domain/entities/User';
import { inject, singleton } from 'tsyringe';
import { users } from '@infrastructure/storage/schemas/users';
import { UserMapper } from '../mappers/UserMapper';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { ExpoSQLiteDatabase } from 'drizzle-orm/expo-sqlite';

export class DrizzleUserRepository implements IUserRepository {
  private db: ExpoSQLiteDatabase<{ users: typeof users }>;
  private mapper: UserMapper;

  constructor(
    @inject('DatabaseClient') private dbClient: ExpoSQLiteDatabase<{ users: typeof users }>,
  ) {
    this.db = dbClient;
    this.mapper = new UserMapper();
  }

  async createUser(userData: NewUserData): Promise<User> {
    const now = new Date();
    const id = uuidv4();

    const userDto = {
      id,
      username: userData.username,
      password: userData.password,
      first_name: userData.firstName,
      last_name: userData.lastName,
      maternal_name: userData.maternalName,
      status: userData.status,
      created_at: now,
      updated_at: now,
      last_login_at: undefined,
    };

    await this.db.insert(users).values(userDto);
    return this.getUserById(id) as Promise<User>;
  }

  async getUserById(id: string): Promise<User | null> {
    const results = await this.db.select().from(users).where(eq(users.id, id));
    if (results.length === 0) return null;
    return this.mapper.toDomain(results[0]);
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const results = await this.db
      .select()
      .from(users)
      .where(eq(users.username, username));
    if (results.length === 0) return null;
    return this.mapper.toDomain(results[0]);
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const now = new Date();
    const updateData: any = { updated_at: now };

    if (userData.username) updateData.username = userData.username;
    if (userData.password) updateData.password = userData.password;
    if (userData.firstName) updateData.first_name = userData.firstName;
    if (userData.lastName) updateData.last_name = userData.lastName;
    if (userData.maternalName !== undefined)
      updateData.maternal_name = userData.maternalName;
    if (userData.status) updateData.status = userData.status;
    if (userData.lastLoginAt) updateData.last_login_at = userData.lastLoginAt;

    await this.db.update(users).set(updateData).where(eq(users.id, id));

    return this.getUserById(id) as Promise<User>;
  }

  async updateUserStatus(id: string, status: UserStatus): Promise<User> {
    return this.updateUser(id, { status });
  }

  async recordLogin(id: string): Promise<User> {
    return this.updateUser(id, { lastLoginAt: new Date() });
  }

  async deleteUser(id: string): Promise<boolean> {
    await this.db.delete(users).where(eq(users.id, id));
    return true;
  }

  async listUsers(limit?: number, offset?: number): Promise<User[]> {
    let query = this.db.select().from(users) as any;
    if (limit !== undefined) query = query.limit(limit);
    if (offset !== undefined) query = query.offset(offset);
    const results = await query;
    return results.map((row: any) => this.mapper.toDomain(row));
  }

  async listUsersByStatus(
    status: UserStatus,
    limit?: number,
    offset?: number,
  ): Promise<User[]> {
    let query = this.db
      .select()
      .from(users)
      .where(eq(users.status, status)) as any;
    if (limit !== undefined) query = query.limit(limit);
    if (offset !== undefined) query = query.offset(offset);
    const results = await query;
    return results.map((row: any) => this.mapper.toDomain(row));
  }
}
