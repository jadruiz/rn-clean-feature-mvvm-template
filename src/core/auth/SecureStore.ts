// src/core/auth/SecureStore.ts
import * as SecureStoreLib from 'expo-secure-store';
import { Logger, LogLevel } from '@core/logging/Logger';
import { consoleAdapter } from '@core/logging/adapters/consoleAdapter';

const logger = new Logger(consoleAdapter, LogLevel.DEBUG);

export class SecureStore {
  static async setItem(key: string, value: string): Promise<void> {
    try {
      await SecureStoreLib.setItemAsync(key, value);
      logger.info(`Clave "${key}" guardada correctamente en SecureStore`);
    } catch (error) {
      logger.error(`Error al guardar la clave "${key}"`, error);
      throw error;
    }
  }

  static async getItem(key: string): Promise<string | null> {
    try {
      return await SecureStoreLib.getItemAsync(key);
    } catch (error) {
      logger.error(`Error al obtener la clave "${key}"`, error);
      throw error;
    }
  }

  static async removeItem(key: string): Promise<void> {
    try {
      await SecureStoreLib.deleteItemAsync(key);
      logger.info(`Clave "${key}" eliminada correctamente de SecureStore`);
    } catch (error) {
      logger.error(`Error al eliminar la clave "${key}"`, error);
      throw error;
    }
  }
}
