import appConfig from '../../../../app.json';
import { Logger, consoleAdapter, LogLevel } from '@core/logging';

// Inicializamos el logger con el adaptador de consola
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
    const defaultConfig = {
      API_URL: 'https://fallback-url.com',
      ENV: 'development',
      APP_NAME: 'MyApp',
      VERSION: '1.0.0',
      SECRET_KEY: '',
    };

    this.config.API_URL =
      process.env.EXPO_PUBLIC_API_URL ?? defaultConfig.API_URL;
    this.config.ENV = process.env.EXPO_PUBLIC_ENV ?? defaultConfig.ENV;
    this.config.SECRET_KEY =
      process.env.EXPO_PUBLIC_SECRET_KEY ?? defaultConfig.SECRET_KEY;

    this.config.APP_NAME = appConfig?.expo?.name ?? defaultConfig.APP_NAME;
    this.config.VERSION = appConfig?.expo?.version ?? defaultConfig.VERSION;

    // Registrar configuración cargada
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
    ];

    requiredKeys.forEach((key) => {
      if (!this.config[key]) {
        logger.error(`❌ ERROR: Configuración faltante: "${key}"`, {
          config: this.config,
        });
      }
    });

    logger.info('✅ Validación de configuración completada.');
  }
}
