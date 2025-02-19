// src/infrastructure/data/repositories/SQLiteAuthRepository.ts
import { injectable } from 'tsyringe';
import {
  IAuthRepository,
  PendingOperation,
} from '@domain/repositories/IAuthRepository';
import { User } from '@domain/entities/User';
import { SQLiteAuthStorage } from '@infrastructure/storage/SQLiteAuthStorage';
import { Logger, LogLevel } from '@core/logging/Logger';
import { consoleAdapter } from '@core/logging/adapters/consoleAdapter';

const logger = new Logger(consoleAdapter, LogLevel.DEBUG);

@injectable()
export class SQLiteAuthRepository implements IAuthRepository {
  /**
   * Persiste el usuario utilizando SQLiteAuthStorage.
   */
  async saveUser(user: User): Promise<void> {
    await SQLiteAuthStorage.persistUser(user);
    logger.info('SQLiteAuthRepository: Usuario guardado en SQLite');
  }

  /**
   * Recupera el usuario almacenado desde SQLite.
   */
  async getUser(): Promise<User | null> {
    const user = await SQLiteAuthStorage.retrieveUser();
    logger.info('SQLiteAuthRepository: Usuario recuperado de SQLite', user);
    return user;
  }

  /**
   * Elimina el usuario almacenado en SQLite.
   */
  async removeUser(): Promise<void> {
    await SQLiteAuthStorage.clearUser();
    logger.info('SQLiteAuthRepository: Usuario eliminado de SQLite');
  }

  /**
   * Autentica al usuario consultando la base de datos SQLite.
   * Busca un usuario que coincida con el username y password proporcionados.
   */
  async authenticate(username: string, password: string): Promise<User | null> {
    const user = await SQLiteAuthStorage.authenticateUser(username, password);
    logger.info('SQLiteAuthRepository: Resultado de la autenticación', user);
    return user;
  }

  /**
   * Procesa en lote operaciones pendientes.
   * Aquí se implementa la lógica para reintentar operaciones (ejemplo: reejecutar login).
   */
  async batchProcess(operations: PendingOperation[]): Promise<void> {
    for (const op of operations) {
      logger.info(
        `SQLiteAuthRepository: Procesando operación "${op.type}"`,
        op.payload,
      );
      // Aquí implementas la lógica para cada operación pendiente.
    }
    logger.info(
      'SQLiteAuthRepository: Procesamiento de operaciones pendientes completado.',
    );
  }
}
