// src/domain/repositories/IUserRepository.ts
import { UserEntity, NewUserData, UserStatus } from '../entities/User';

export interface IUserRepository {
  /**
   * Crea un nuevo usuario a partir de los datos proporcionados.
   */
  createUser(user: NewUserData): Promise<UserEntity>;

  getUserById(id: string): Promise<UserEntity | null>;

  getUserByUsername(username: string): Promise<UserEntity | null>;

  updateUser(id: string, userData: Partial<UserEntity>): Promise<UserEntity>;

  updateUserStatus(id: string, status: UserStatus): Promise<UserEntity>;

  recordLogin(id: string): Promise<UserEntity>;

  deleteUser(id: string): Promise<boolean>;

  listUsers(limit?: number, offset?: number): Promise<UserEntity[]>;

  listUsersByStatus(
    status: UserStatus,
    limit?: number,
    offset?: number,
  ): Promise<UserEntity[]>;
}
