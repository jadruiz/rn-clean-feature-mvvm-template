// src/infrastructure/data/repositories/WatermelonUserRepository.ts
import { injectable } from 'tsyringe';
import { IUserRepository } from '@domain/repositories/IUserRepository';
import { UserEntity, NewUserData, UserStatus } from '@domain/entities/User';
import { database } from '@infrastructure/storage/Database';
import WatermelonUser from '@infrastructure/storage/models/User';
import { v4 as uuidv4 } from 'uuid';
import { UserMapper } from '@infrastructure/data/mappers/UserMapper';

@injectable()
export default class WatermelonUserRepository implements IUserRepository {
  async createUser(userData: NewUserData): Promise<UserEntity> {
    const newUser = await database.write(async () => {
      return await database.collections
        .get<WatermelonUser>('users')
        .create((user) => {
          user._raw.id = uuidv4();
          user.username = userData.username;
          user.password = userData.password;
          user.firstName = userData.firstName;
          user.lastName = userData.lastName;
          user.maternalName = userData.maternalName || '';
          user.status = 'pending_verification';
          const now = Date.now();
          user.createdAt = now;
          user.updatedAt = now;
          user.lastLoginAt = null;
        });
    });
    return UserMapper.toEntity(newUser);
  }

  async getUserById(id: string): Promise<UserEntity | null> {
    try {
      const user = await database.collections
        .get<WatermelonUser>('users')
        .find(id);
      return UserMapper.toEntity(user);
    } catch (error) {
      return null;
    }
  }

  async getUserByUsername(username: string): Promise<UserEntity | null> {
    try {
      const { Q } = require('@nozbe/watermelondb');
      const users = await database.collections
        .get<WatermelonUser>('users')
        .query(Q.where('username', username))
        .fetch();
      if (users.length > 0) {
        return UserMapper.toEntity(users[0]);
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  async updateUser(
    id: string,
    userData: Partial<UserEntity>,
  ): Promise<UserEntity> {
    const user = await database.collections
      .get<WatermelonUser>('users')
      .find(id);
    await database.write(async () => {
      await user.update((u) => {
        if (userData.username !== undefined) u.username = userData.username;
        if (userData.password !== undefined) u.password = userData.password;
        if (userData.firstName !== undefined) u.firstName = userData.firstName;
        if (userData.lastName !== undefined) u.lastName = userData.lastName;
        if (userData.maternalName !== undefined)
          u.maternalName = userData.maternalName;
        if (userData.status !== undefined) u.status = userData.status;
        u.updatedAt = Date.now();
      });
    });
    return UserMapper.toEntity(user);
  }

  async updateUserStatus(id: string, status: UserStatus): Promise<UserEntity> {
    const user = await database.collections
      .get<WatermelonUser>('users')
      .find(id);
    await database.write(async () => {
      await user.update((u) => {
        u.status = status;
        u.updatedAt = Date.now();
      });
    });
    return UserMapper.toEntity(user);
  }

  async recordLogin(id: string): Promise<UserEntity> {
    const user = await database.collections
      .get<WatermelonUser>('users')
      .find(id);
    await database.write(async () => {
      await user.update((u) => {
        u.lastLoginAt = Date.now();
        u.updatedAt = Date.now();
      });
    });
    return UserMapper.toEntity(user);
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      const user = await database.collections
        .get<WatermelonUser>('users')
        .find(id);
      await database.write(async () => {
        await user.markAsDeleted();
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async listUsers(limit?: number, offset?: number): Promise<UserEntity[]> {
    const users = await database.collections
      .get<WatermelonUser>('users')
      .query()
      .fetch();
    const sliced =
      typeof limit === 'number'
        ? users.slice(offset || 0, (offset || 0) + limit)
        : users;
    return sliced.map(UserMapper.toEntity);
  }

  async listUsersByStatus(
    status: UserStatus,
    limit?: number,
    offset?: number,
  ): Promise<UserEntity[]> {
    const { Q } = require('@nozbe/watermelondb');
    const users = await database.collections
      .get<WatermelonUser>('users')
      .query(Q.where('status', status))
      .fetch();
    const sliced =
      typeof limit === 'number'
        ? users.slice(offset || 0, (offset || 0) + limit)
        : users;
    return sliced.map(UserMapper.toEntity);
  }
}
