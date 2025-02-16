import appConfig from '../../../../app.json';

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
    };

    this.config.API_URL = process.env.EXPO_PUBLIC_API_URL ?? defaultConfig.API_URL;
    this.config.ENV = process.env.EXPO_PUBLIC_ENV ?? defaultConfig.ENV;

    this.config.APP_NAME = appConfig?.expo?.name ?? defaultConfig.APP_NAME;
    this.config.VERSION = appConfig?.expo?.version ?? defaultConfig.VERSION;

    this.validateConfig();

    console.log('📢 Configuración cargada:', this.config);
  }

  public get<T = any>(key: string): T {
    if (this.config[key] !== undefined) {
      return this.config[key] as T;
    }
    console.warn(`⚠️ ConfigAdapter: "${key}" no encontrado.`);
    return undefined as unknown as T;
  }

  private validateConfig() {
    const requiredKeys = ['API_URL', 'ENV', 'APP_NAME', 'VERSION'];
    requiredKeys.forEach((key) => {
      if (!this.config[key]) {
        console.error(`❌ ERROR: Configuración faltante: "${key}"`);
      }
    });
  }
}
