// src/core/config/initApp.ts
import { Logger } from '@core/logging/Logger';
import { consoleAdapter } from '@core/logging/adapters/consoleAdapter';
import { LogLevel } from '@core/logging/Logger';
import TelemetryService from '@core/telemetry/TelemetryService';
import { DummyAnalyticsAdapter } from '@core/telemetry/AnalyticsAdapter';

/**
 * Inicializa la aplicación: configura logging y telemetría.
 */
export const initApp = () => {
  // Inicializar Telemetría
  TelemetryService.initialize(new DummyAnalyticsAdapter());
  TelemetryService.getInstance().logEvent('AppStarted', { timestamp: new Date().toISOString() });

  // Inicializar Logger
  const logger = new Logger(consoleAdapter, LogLevel.DEBUG);
  logger.info('📢 Aplicación inicializada correctamente');

  // Simulación de error para verificar telemetría y logging
  try {
    throw new Error('Test error for telemetry');
  } catch (error) {
    TelemetryService.getInstance().logError(error as Error, { context: 'initApp' });
    logger.error('Error durante la inicialización', error);
  }
};
