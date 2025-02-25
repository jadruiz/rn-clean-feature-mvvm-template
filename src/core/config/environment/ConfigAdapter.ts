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
    // Configuración por defecto
    const defaultConfig = {
      API_URL: 'https://fallback-url.com',
      ENV: 'development',
      APP_NAME: 'MyApp',
      VERSION: '1.0.0',
      SECRET_KEY: 'default_secret_key',
      STATE_ADAPTER: 'redux',
      ENABLE_NEW_AUTH_FLOW: false,
      ENABLE_ADVANCED_ANALYTICS: false,
    };

    // Cargar configuración desde expoConfig
    const expoConfig = Constants.expoConfig?.extra || {};

    // Centralizamos la carga de la configuración con valores predeterminados
    this.config = this.mergeConfigWithDefaults(expoConfig, defaultConfig);

    logger.info('📢 Configuración cargada correctamente.', {
      config: this.config,
    });

    this.validateConfig();
  }

  /**
   * Combina la configuración del manifiesto de Expo con los valores predeterminados.
   * @param {Record<string, any>} config - Configuración cargada desde Expo
   * @param {Record<string, any>} defaultConfig - Valores predeterminados para cada clave
   * @returns {Record<string, any>} Configuración final combinada
   */
  private mergeConfigWithDefaults(
    config: Record<string, any>,
    defaultConfig: Record<string, any>,
  ) {
    return Object.keys(defaultConfig).reduce((acc, key) => {
      // Si la configuración tiene la clave, usa el valor; de lo contrario, usa el valor predeterminado
      acc[key] = config[key] !== undefined ? config[key] : defaultConfig[key];
      return acc;
    }, {} as Record<string, any>);
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
