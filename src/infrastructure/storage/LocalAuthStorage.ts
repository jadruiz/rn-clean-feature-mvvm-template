// src/infrastructure/storage/LocalAuthStorage.ts
import { AsyncStorageService } from './AsyncStorageService';
import { User } from '@domain/entities/User';
import { PendingOperation } from '@domain/repositories/IAuthRepository';
import { Logger, LogLevel } from '@core/logging/Logger';
import { consoleAdapter } from '@core/logging/adapters/consoleAdapter';

const logger = new Logger(consoleAdapter, LogLevel.DEBUG);

const USER_KEY = 'auth_user';
const PENDING_OPS_KEY = 'pending_auth_operations';

export class LocalAuthStorage {
  // Guarda el usuario en el almacenamiento local.
  static async persistUser(user: User): Promise<void> {
    await AsyncStorageService.setItem(USER_KEY, user);
    logger.info('LocalAuthStorage: Usuario persistido.');
  }

  // Recupera el usuario almacenado.
  static async retrieveUser(): Promise<User | null> {
    const user = await AsyncStorageService.getItem<User>(USER_KEY);
    logger.info('LocalAuthStorage: Usuario recuperado.');
    return user;
  }

  // Elimina el usuario almacenado.
  static async clearUser(): Promise<void> {
    await AsyncStorageService.removeItem(USER_KEY);
    logger.info('LocalAuthStorage: Usuario eliminado.');
  }

  // Encola una operación pendiente para sincronización (por ejemplo, login pendiente).
  static async enqueueOperation(operation: PendingOperation): Promise<void> {
    const currentOps =
      (await AsyncStorageService.getItem<PendingOperation[]>(
        PENDING_OPS_KEY,
      )) || [];
    currentOps.push(operation);
    await AsyncStorageService.setItem(PENDING_OPS_KEY, currentOps);
    logger.info(
      `LocalAuthStorage: Operación pendiente "${operation.type}" encolada.`,
    );
  }

  // Recupera las operaciones pendientes de sincronización.
  static async getPendingOperations(): Promise<PendingOperation[]> {
    const ops = await AsyncStorageService.getItem<PendingOperation[]>(
      PENDING_OPS_KEY,
    );
    logger.info(
      `LocalAuthStorage: Se recuperaron ${
        ops ? ops.length : 0
      } operación(es) pendiente(s).`,
    );
    return ops || [];
  }

  // Limpia la cola de operaciones pendientes.
  static async clearPendingOperations(): Promise<void> {
    await AsyncStorageService.removeItem(PENDING_OPS_KEY);
    logger.info('LocalAuthStorage: Cola de operaciones pendientes limpiada.');
  }
}
