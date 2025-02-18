// src/core/config/environment/FeatureFlags.ts

/**
 * Definición de feature flags.
 * Estas flags se basan en variables de entorno (prefijadas con EXPO_PUBLIC_)
 * y permiten activar/desactivar funcionalidades dinámicamente.
 */
import { Config } from './EnvConfig';

export const FeatureFlags = {
  ENABLE_NEW_AUTH_FLOW: Config.get<string>('ENABLE_NEW_AUTH_FLOW') === 'true',
  ENABLE_ADVANCED_ANALYTICS:
    Config.get<string>('ENABLE_ADVANCED_ANALYTICS') === 'true',
};
