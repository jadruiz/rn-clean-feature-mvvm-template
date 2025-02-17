// src/core/security/KeychainService.ts
import { injectable } from 'tsyringe';
import * as SecureStore from 'expo-secure-store';

@injectable()
export class KeychainService {
  static async setItem(key: string, value: string): Promise<void> {
    await SecureStore.setItemAsync(key, value);
  }

  static async getItem(key: string): Promise<string | null> {
    return await SecureStore.getItemAsync(key);
  }

  static async deleteItem(key: string): Promise<void> {
    await SecureStore.deleteItemAsync(key);
  }
}
