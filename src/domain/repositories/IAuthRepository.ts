// src/domain/repositories/IAuthRepository.ts
import { User } from '@domain/entities/User';

export interface IAuthRepository {
  /**
   * Guarda el usuario en el almacenamiento
   */
  saveUser(user: User): Promise<void>;

  /**
   * Obtiene el usuario almacenado
   */
  getUser(): Promise<User | null>;

  /**
   * Elimina el usuario almacenado
   */
  removeUser(): Promise<void>;

  /**
   * Autentica a un usuario validando el nombre de usuario y contraseña.
   */
  authenticate(username: string, password: string): Promise<User | null>;

  /**
   * Procesa operaciones pendientes.
   */
  batchProcess?(operations: PendingOperation[]): Promise<void>;
}

export interface PendingOperation {
  type: string;
  payload: any;
  timestamp: number;
}
