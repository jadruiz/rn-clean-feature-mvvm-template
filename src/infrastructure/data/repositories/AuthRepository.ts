// src/infrastructure/data/repositories/AuthRepository.ts
import {
  IAuthRepository,
  PendingOperation,
} from '@domain/repositories/IAuthRepository';
import { User } from '@domain/entities/User';
import { SQLiteAuthStorage } from '@infrastructure/storage/SQLiteAuthStorage';
import { Logger, LogLevel } from '@core/logging/Logger';
import { consoleAdapter } from '@core/logging/adapters/consoleAdapter';

const logger = new Logger(consoleAdapter, LogLevel.DEBUG);

export class AuthRepository implements IAuthRepository {
  /**
   * Guarda la información del usuario utilizando SQLiteAuthStorage.
   */
  async saveUser(user: User): Promise<void> {
    await SQLiteAuthStorage.persistUser(user);
    logger.info('AuthRepository: Usuario guardado en SQLite');
  }

  /**
   * Recupera el usuario almacenado.
   */
  async getUser(): Promise<User | null> {
    const user = await SQLiteAuthStorage.retrieveUser();
    logger.info('AuthRepository: Usuario recuperado de SQLite', user);
    return user;
  }

  /**
   * Elimina el usuario almacenado.
   */
  async removeUser(): Promise<void> {
    await SQLiteAuthStorage.clearUser();
    logger.info('AuthRepository: Usuario eliminado de SQLite');
  }

  /**
   * Autentica a un usuario validando username y password.
   */
  async authenticate(username: string, password: string): Promise<User | null> {
    const user = await SQLiteAuthStorage.authenticateUser(username, password);
    logger.info('AuthRepository: Resultado de la autenticación', user);
    return user;
  }

  /**
   * Procesa en lote las operaciones pendientes.
   */
  async batchProcess(operations: PendingOperation[]): Promise<void> {
    for (const op of operations) {
      logger.info(
        `AuthRepository: Procesando operación "${op.type}"`,
        op.payload,
      );
      // Aquí implementarías la lógica para reejecutar la operación pendiente.
    }
    logger.info('AuthRepository: Batch processing completado.');
  }
}
