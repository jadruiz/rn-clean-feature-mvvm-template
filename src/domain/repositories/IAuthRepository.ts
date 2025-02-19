// src/domain/repositories/IAuthRepository.ts
import { User } from '@domain/entities/User';

export interface IAuthRepository {
  /**
   * Guarda la información de autenticación del usuario.
   */
  saveUser(user: User): Promise<void>;

  /**
   * Recupera la información de autenticación del usuario, si existe.
   */
  getUser(): Promise<User | null>;

  /**
   * Elimina la información de autenticación del usuario.
   */
  removeUser(): Promise<void>;

  /**
   * Opcional: Permite procesar en lote operaciones pendientes para sincronización.
   */
  batchProcess?(operations: PendingOperation[]): Promise<void>;
}

/**
 * Tipo para definir una operación pendiente (por ejemplo, un login pendiente).
 */
export interface PendingOperation {
  type: string;
  payload: any;
  timestamp: number;
}
