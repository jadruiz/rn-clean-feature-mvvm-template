// src/infrastructure/storage/StorageService.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
// Para una futura integración con SQLite, podrías importar y utilizar SQLite.
// import * as SQLite from 'expo-sqlite';

/**
 * StorageService es una abstracción para el almacenamiento persistente.
 * Actualmente usa AsyncStorage, pero se puede adaptar en el futuro para utilizar SQLite
 * u otro mecanismo de almacenamiento sin afectar al resto de la aplicación.
 */
export class StorageService {
  /**
   * Almacena un valor asociado a una clave.
   * @param key Clave del valor a almacenar.
   * @param value Valor que se desea almacenar.
   */
  static async setItem(key: string, value: any): Promise<void> {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    // Para migrar a SQLite, reemplaza la implementación de AsyncStorage por lógica de SQLite.
  }

  /**
   * Recupera un valor previamente almacenado.
   * @param key Clave del valor a recuperar.
   * @returns El valor almacenado o null si no existe.
   */
  static async getItem<T>(key: string): Promise<T | null> {
    const storedValue = await AsyncStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  }

  /**
   * Elimina un valor almacenado.
   * @param key Clave del valor a eliminar.
   */
  static async removeItem(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  }
}
