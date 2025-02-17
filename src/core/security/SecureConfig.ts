// src/core/config/security/SecureConfig.ts
import { Logger, consoleAdapter, LogLevel } from '@core/logging';
import { Config } from '@core/config/environment/EnvConfig';

const logger = new Logger(consoleAdapter, LogLevel.INFO);

export class SecureConfig {
  /**
   * Retorna el valor de una clave de configuración segura utilizando el ConfigAdapter.
   * Se recomienda cargar estas claves desde variables de entorno o sistemas seguros de gestión de secretos.
   */
  static get(key: string): string {
    const value = Config.get<string>(key);
    if (!value) {
      logger.warn(`La configuración segura para "${key}" no está definida.`);
      return '';
    }
    return value;
  }
}
