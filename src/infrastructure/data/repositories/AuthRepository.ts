// src/infrastructure/repositories/AuthRepository.ts
import { IAuthRepository, PendingOperation } from '@domain/repositories/IAuthRepository';
import { User } from '@domain/entities/User';
import { LocalAuthStorage } from '@infrastructure/storage/LocalAuthStorage';
import { Logger, LogLevel } from '@core/logging/Logger';
import { consoleAdapter } from '@core/logging/adapters/consoleAdapter';

const logger = new Logger(consoleAdapter, LogLevel.DEBUG);

export class AuthRepository implements IAuthRepository {
  /**
   * Guarda la información de autenticación del usuario utilizando el servicio de almacenamiento local.
   */
  async saveUser(user: User): Promise<void> {
    await LocalAuthStorage.persistUser(user);
    logger.info('AuthRepository: Usuario guardado.');
  }

  /**
   * Recupera la información de autenticación del usuario del almacenamiento local.
   */
  async getUser(): Promise<User | null> {
    const user = await LocalAuthStorage.retrieveUser();
    logger.info('AuthRepository: Usuario recuperado.');
    return user;
  }

  /**
   * Elimina la información de autenticación del usuario del almacenamiento local.
   */
  async removeUser(): Promise<void> {
    await LocalAuthStorage.clearUser();
    logger.info('AuthRepository: Usuario eliminado.');
  }

  /**
   * Opcional: Procesa en lote las operaciones pendientes.
   * Aquí puedes implementar la lógica para reintentar operaciones de login, etc.
   */
  async batchProcess(operations: PendingOperation[]): Promise<void> {
    for (const op of operations) {
      logger.info(`AuthRepository: Procesando operación "${op.type}" con payload:`, op.payload);
      // Aquí implementa la lógica para procesar cada operación.
      // Por ejemplo, si la operación es de tipo 'LOGIN', intenta reejecutar el login.
    }
    logger.info('AuthRepository: Todas las operaciones pendientes fueron procesadas.');
  }
}
