// src/core/security/EncryptionService.ts
import { injectable } from 'tsyringe';
import CryptoJS from 'crypto-js';
import * as SecureStore from 'expo-secure-store';
import { Config } from '@core/config/environment/EnvConfig';
import { Logger, consoleAdapter, LogLevel } from '@core/logging';

@injectable()
export class EncryptionService {
  private static secretKey: string | null = null;

  /**
   * Inicializa la clave secreta.
   *
   * - En **desarrollo**: se usa la clave directamente desde la configuración (EXPO_PUBLIC_SECRET_KEY).
   * - En **producción**: se espera que la clave se haya inyectado de forma segura en SecureStore.
   *
   * **Nota:** En producción es esencial no exponer la clave en el bundle. Asegúrate de
   * inyectar la clave en SecureStore mediante un proceso controlado (por ejemplo, desde el backend o durante el despliegue).
   */
  public static async initSecretKey(): Promise<void> {
    const logger = new Logger(consoleAdapter, LogLevel.DEBUG);
    const env = Config.get<string>('ENV');

    if (env === 'development') {
      // Para desarrollo, usamos la clave directamente desde la configuración.
      this.secretKey = Config.get<string>('EXPO_PUBLIC_SECRET_KEY');
      logger.info(
        'EncryptionService: Usando clave de configuración (development).',
      );
    } else {
      // En producción, se espera que la clave se haya almacenado de forma segura en SecureStore.
      const key = await SecureStore.getItemAsync('SECRET_KEY');
      if (!key) {
        logger.error(
          'EncryptionService: Clave secreta no encontrada en SecureStore. Se requiere almacenamiento seguro en producción.',
        );
        throw new Error(
          'EncryptionService: Clave secreta no encontrada en SecureStore. Se requiere almacenamiento seguro en producción.',
        );
      }
      this.secretKey = key;
      logger.info(
        'EncryptionService: Clave secreta cargada desde SecureStore (production).',
      );
    }
  }

  public static encrypt(text: string): string {
    if (!this.secretKey) {
      throw new Error(
        'EncryptionService no inicializado. Llama a initSecretKey() primero.',
      );
    }
    return CryptoJS.AES.encrypt(text, this.secretKey).toString();
  }

  public static decrypt(cipherText: string): string {
    if (!this.secretKey) {
      throw new Error(
        'EncryptionService no inicializado. Llama a initSecretKey() primero.',
      );
    }
    const bytes = CryptoJS.AES.decrypt(cipherText, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
