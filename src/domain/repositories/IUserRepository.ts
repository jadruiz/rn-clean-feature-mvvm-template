// src/domain/repositories/IUserRepository.ts
import { User, NewUserData, UserStatus } from '../entities/User';

export interface IUserRepository {
  /**
   * Crea un nuevo usuario a partir de los datos proporcionados.
   */
  createUser(user: NewUserData): Promise<User>;

  getUserById(id: string): Promise<User | null>;

  getUserByUsername(username: string): Promise<User | null>;

  updateUser(id: string, userData: Partial<User>): Promise<User>;

  updateUserStatus(id: string, status: UserStatus): Promise<User>;

  recordLogin(id: string): Promise<User>;

  deleteUser(id: string): Promise<boolean>;

  listUsers(limit?: number, offset?: number): Promise<User[]>;

  listUsersByStatus(
    status: UserStatus,
    limit?: number,
    offset?: number,
  ): Promise<User[]>;
}
