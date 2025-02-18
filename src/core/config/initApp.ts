// src/core/config/initApp.ts
import { Logger } from '@core/logging/Logger';
import { consoleAdapter } from '@core/logging/adapters/consoleAdapter';
import { LogLevel } from '@core/logging/Logger';
import TelemetryService from '@core/telemetry/TelemetryService';
import { DummyAnalyticsAdapter } from '@core/telemetry/AnalyticsAdapter';
import { getStateAdapter } from '@core/state/adapters';
import { IStateAdapter } from '@core/state/interfaces/IStateAdapter';
import { RootState } from '@core/state/redux/store';

/**
 * Inicializa la aplicación: configura logging, telemetría y el estado global.
 */
export const initApp = async (): Promise<{
  stateAdapter: IStateAdapter<RootState>;
} | null> => {
  try {
    // 🔹 Inicializa Telemetría
    TelemetryService.initialize(new DummyAnalyticsAdapter());
    TelemetryService.getInstance().logEvent('AppStarted', {
      timestamp: new Date().toISOString(),
    });

    // 🔹 Inicializa Logger
    const logger = new Logger(consoleAdapter, LogLevel.DEBUG);
    logger.info('📢 Aplicación inicializada correctamente');

    // 🔹 Cargar Adaptador de Estado (Redux o In-Memory)
    const stateAdapter = await getStateAdapter();
    logger.info(`🗄 Estado inicializado con: ${stateAdapter.constructor.name}`);

    return { stateAdapter };
  } catch (error) {
    console.error('❌ Error en la inicialización de la aplicación', error);
    return null;
  }
};
