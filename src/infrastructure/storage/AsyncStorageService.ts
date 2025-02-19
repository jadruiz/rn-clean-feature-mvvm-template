// src/infrastructure/storage/AsyncStorageService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Logger, LogLevel } from '@core/logging/Logger';
import { consoleAdapter } from '@core/logging/adapters/consoleAdapter';

const logger = new Logger(consoleAdapter, LogLevel.DEBUG);

export class AsyncStorageService {
  static async setItem<T>(key: string, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      logger.info(`AsyncStorage: Clave "${key}" guardada correctamente.`);
    } catch (error) {
      logger.error(`AsyncStorage: Error al guardar la clave "${key}"`, error);
      throw error;
    }
  }

  static async getItem<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      const value = jsonValue ? (JSON.parse(jsonValue) as T) : null;
      logger.info(`AsyncStorage: Clave "${key}" recuperada.`);
      return value;
    } catch (error) {
      logger.error(`AsyncStorage: Error al obtener la clave "${key}"`, error);
      throw error;
    }
  }

  static async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
      logger.info(`AsyncStorage: Clave "${key}" eliminada.`);
    } catch (error) {
      logger.error(`AsyncStorage: Error al eliminar la clave "${key}"`, error);
      throw error;
    }
  }
}
