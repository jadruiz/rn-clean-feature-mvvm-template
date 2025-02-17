// src/core/security/EncryptionService.ts
import CryptoJS from 'crypto-js';
import { Config } from '@core/config/environment/EnvConfig';

// Obtiene la clave secreta de la configuración.
// Asegúrate de definir la variable "SECRET_KEY" en tu archivo .env o configuración.
const SECRET_KEY = Config.get<string>('SECRET_KEY');

export class EncryptionService {
  static encrypt(text: string): string {
    return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
  }

  static decrypt(cipherText: string): string {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
