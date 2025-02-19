// src/infrastructure/storage/LocalAuthStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Logger, LogLevel } from '@core/logging/Logger';
import { consoleAdapter } from '@core/logging/adapters/consoleAdapter';
import { User } from '@domain/entities/User';
import { PendingOperation } from '@domain/repositories/IAuthRepository';

const logger = new Logger(consoleAdapter, LogLevel.DEBUG);
const USER_KEY = 'auth_user';
const PENDING_OPS_KEY = 'pending_auth_operations';

export class LocalAuthStorage {
  /**
   * Persiste el usuario en AsyncStorage.
   */
  static async persistUser(user: User): Promise<void> {
    try {
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
      logger.info('LocalAuthStorage: Usuario persistido.');
    } catch (error) {
      logger.error('LocalAuthStorage: Error al persistir usuario', error);
      throw error;
    }
  }

  /**
   * Recupera el usuario almacenado en AsyncStorage.
   */
  static async retrieveUser(): Promise<User | null> {
    try {
      const userString = await AsyncStorage.getItem(USER_KEY);
      if (userString) {
        const user: User = JSON.parse(userString);
        logger.info('LocalAuthStorage: Usuario recuperado.');
        return user;
      }
      return null;
    } catch (error) {
      logger.error('LocalAuthStorage: Error al recuperar usuario', error);
      throw error;
    }
  }

  /**
   * Elimina el usuario almacenado en AsyncStorage.
   */
  static async clearUser(): Promise<void> {
    try {
      await AsyncStorage.removeItem(USER_KEY);
      logger.info('LocalAuthStorage: Usuario eliminado.');
    } catch (error) {
      logger.error('LocalAuthStorage: Error al eliminar usuario', error);
      throw error;
    }
  }

  /**
   * Encola una operación pendiente para sincronización.
   */
  static async enqueueOperation(operation: PendingOperation): Promise<void> {
    try {
      const opsString = await AsyncStorage.getItem(PENDING_OPS_KEY);
      const currentOps: PendingOperation[] = opsString ? JSON.parse(opsString) : [];
      currentOps.push(operation);
      await AsyncStorage.setItem(PENDING_OPS_KEY, JSON.stringify(currentOps));
      logger.info(`LocalAuthStorage: Operación pendiente "${operation.type}" encolada.`);
    } catch (error) {
      logger.error('LocalAuthStorage: Error encolando operación pendiente', error);
      throw error;
    }
  }

  /**
   * Recupera todas las operaciones pendientes.
   */
  static async getPendingOperations(): Promise<PendingOperation[]> {
    try {
      const opsString = await AsyncStorage.getItem(PENDING_OPS_KEY);
      const ops: PendingOperation[] = opsString ? JSON.parse(opsString) : [];
      logger.info(`LocalAuthStorage: Se recuperaron ${ops.length} operación(es) pendiente(s).`);
      return ops;
    } catch (error) {
      logger.error('LocalAuthStorage: Error al recuperar operaciones pendientes', error);
      throw error;
    }
  }

  /**
   * Limpia la cola de operaciones pendientes.
   */
  static async clearPendingOperations(): Promise<void> {
    try {
      await AsyncStorage.removeItem(PENDING_OPS_KEY);
      logger.info('LocalAuthStorage: Cola de operaciones pendientes limpiada.');
    } catch (error) {
      logger.error('LocalAuthStorage: Error al limpiar operaciones pendientes', error);
      throw error;
    }
  }
}
