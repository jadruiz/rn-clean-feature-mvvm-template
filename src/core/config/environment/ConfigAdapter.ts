// src/core/config/environment/ConfigAdapter.ts
import Constants from 'expo-constants';
import { Logger, consoleAdapter, LogLevel } from '@core/logging';

const logger = new Logger(consoleAdapter, LogLevel.INFO);

export class ConfigAdapter {
  private static instance: ConfigAdapter;
  private config: Record<string, any> = {};

  private constructor() {
    this.loadConfig();
  }

  public static getInstance(): ConfigAdapter {
    if (!ConfigAdapter.instance) {
      ConfigAdapter.instance = new ConfigAdapter();
    }
    return ConfigAdapter.instance;
  }

  private loadConfig() {
    // Valores por defecto sin prefijos
    const defaultConfig: Record<string, any> = {
      API_URL: 'https://fallback-url.com',
      ENV: 'development',
      APP_NAME: 'MyApp',
      VERSION: '1.0.0',
      SECRET_KEY: 'default_secret_key',
      STATE_ADAPTER: 'redux',
      ENABLE_NEW_AUTH_FLOW: false,
      ENABLE_ADVANCED_ANALYTICS: false,
      DB_NAME: 'app.db',
      DB_REPOSITORY_TYPE: 'drizzle',
    };
  
    const expoConfig = Constants.expoConfig?.extra || {};
    console.log('🚀 expoConfig.extra:', expoConfig);
  
    // Mapea las claves públicas y privadas a tus claves internas
    const mappedConfig: Record<string, any> = {
      API_URL: expoConfig.EXPO_PUBLIC_API_URL || defaultConfig.API_URL,
      ENV: expoConfig.EXPO_PUBLIC_ENV || defaultConfig.ENV,
      APP_NAME: expoConfig.EXPO_PUBLIC_APP_NAME || defaultConfig.APP_NAME,
      VERSION: expoConfig.EXPO_PUBLIC_VERSION || defaultConfig.VERSION,
      SECRET_KEY: expoConfig.EXPO_PRIVATE_SECRET_KEY || defaultConfig.SECRET_KEY,
      STATE_ADAPTER:
        expoConfig.EXPO_PUBLIC_STATE_ADAPTER || defaultConfig.STATE_ADAPTER,
      ENABLE_NEW_AUTH_FLOW:
        expoConfig.EXPO_PUBLIC_ENABLE_NEW_AUTH_FLOW !== undefined
          ? expoConfig.EXPO_PUBLIC_ENABLE_NEW_AUTH_FLOW
          : defaultConfig.ENABLE_NEW_AUTH_FLOW,
      ENABLE_ADVANCED_ANALYTICS:
        expoConfig.EXPO_PUBLIC_ENABLE_ADVANCED_ANALYTICS !== undefined
          ? expoConfig.EXPO_PUBLIC_ENABLE_ADVANCED_ANALYTICS
          : defaultConfig.ENABLE_ADVANCED_ANALYTICS,
      DB_NAME: expoConfig.EXPO_PUBLIC_DB_NAME || defaultConfig.DB_NAME, 
      DB_REPOSITORY_TYPE: expoConfig.EXPO_PUBLIC_DB_REPOSITORY_TYPE || defaultConfig.DB_REPOSITORY_TYPE,
    };
  
    this.config = mappedConfig;
  
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
