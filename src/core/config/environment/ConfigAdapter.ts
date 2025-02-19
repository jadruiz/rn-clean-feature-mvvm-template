// src/core/config/environment/ConfigAdapter.ts
import appConfig from '../../../../app.json';
import { Logger, consoleAdapter, LogLevel } from '@core/logging';

const logger = new Logger(consoleAdapter, LogLevel.INFO);

export class ConfigAdapter {
  private static instance: ConfigAdapter;
  private config: Record<string, any> = {};

  private constructor() {
    this.loadConfig();
    logger.info(
      'EXPO_PUBLIC_STATE_ADAPTER: ' + process.env.EXPO_PUBLIC_STATE_ADAPTER,
    );
  }

  public static getInstance(): ConfigAdapter {
    if (!ConfigAdapter.instance) {
      ConfigAdapter.instance = new ConfigAdapter();
    }
    return ConfigAdapter.instance;
  }

  private loadConfig() {
    // Configuración por defecto
    const defaultConfig = {
      API_URL: 'https://fallback-url.com',
      ENV: 'development',
      APP_NAME: 'MyApp',
      VERSION: '1.0.0',
      STATE_ADAPTER:'redux',
      SECRET_KEY: '',
      DB_NAME: '',
      ENABLE_NEW_AUTH_FLOW: false,
      ENABLE_ADVANCED_ANALYTICS: false,
    };

    // Cargar configuración desde variables de entorno
    this.config = {
      API_URL: process.env.EXPO_PUBLIC_API_URL || defaultConfig.API_URL,
      ENV: process.env.EXPO_PUBLIC_ENV || defaultConfig.ENV,
      APP_NAME: appConfig?.expo?.name || defaultConfig.APP_NAME,
      DB_NAME: process.env.EXPO_PUBLIC_DB_NAME || defaultConfig.DB_NAME,
      STATE_ADAPTER: process.env.EXPO_PUBLIC_STATE_ADAPTER || defaultConfig.STATE_ADAPTER,
      VERSION: appConfig?.expo?.version || defaultConfig.VERSION,
      ENABLE_NEW_AUTH_FLOW:
        process.env.EXPO_PUBLIC_ENABLE_NEW_AUTH_FLOW === 'true'
          ? true
          : process.env.EXPO_PUBLIC_ENABLE_NEW_AUTH_FLOW === 'false'
          ? false
          : defaultConfig.ENABLE_NEW_AUTH_FLOW,
      ENABLE_ADVANCED_ANALYTICS:
        process.env.EXPO_PUBLIC_ENABLE_ADVANCED_ANALYTICS === 'true'
          ? true
          : process.env.EXPO_PUBLIC_ENABLE_ADVANCED_ANALYTICS === 'false'
          ? false
          : defaultConfig.ENABLE_ADVANCED_ANALYTICS,
      SECRET_KEY:
        process.env.EXPO_PUBLIC_SECRET_KEY || defaultConfig.SECRET_KEY,
    };

    logger.info('📢 Configuración cargada correctamente.', {
      config: this.config,
    });
    this.validateConfig();
  }

  public get<T = any>(key: string): T {
    if (this.config[key] !== undefined) {
      logger.debug(`🔍 ConfigAdapter: obteniendo "${key}".`, {
        value: this.config[key],
      });
      return this.config[key] as T;
    }
    logger.warn(`⚠️ ConfigAdapter: Clave "${key}" no encontrada.`);
    return undefined as unknown as T;
  }

  private validateConfig() {
    const requiredKeys = [
      'API_URL',
      'ENV',
      'APP_NAME',
      'VERSION',
      'SECRET_KEY',
      'ENABLE_NEW_AUTH_FLOW',
      'ENABLE_ADVANCED_ANALYTICS',
    ];

    requiredKeys.forEach((key) => {
      if (this.config[key] === undefined || this.config[key] === '') {
        logger.error(`❌ ERROR: Configuración faltante: "${key}"`, {
          config: this.config,
        });
      }
    });

    logger.info('✅ Validación de configuración completada.');
  }
}

export const Config = ConfigAdapter.getInstance();
