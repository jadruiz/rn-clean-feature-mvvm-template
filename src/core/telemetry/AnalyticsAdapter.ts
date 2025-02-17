// src/core/telemetry/AnalyticsAdapter.ts
import { Logger, consoleAdapter, LogLevel } from '@core/logging';

/**
 * Interfaz que define los métodos que debe implementar un adaptador
 * de analíticas/telemetría.
 */
export interface AnalyticsAdapter {
  logEvent(eventName: string, data?: Record<string, any>): void;
  logError(error: Error, context?: Record<string, any>): void;
}

/**
 * Implementación dummy del adaptador de analíticas.
 * Actualmente, solo imprime en la consola usando el sistema de logs.
 */
export class DummyAnalyticsAdapter implements AnalyticsAdapter {
  private logger = new Logger(consoleAdapter, LogLevel.DEBUG);

  logEvent(eventName: string, data?: Record<string, any>): void {
    this.logger.info(`[Telemetry] Event: ${eventName}`, data || {});
  }

  logError(error: Error, context?: Record<string, any>): void {
    this.logger.error(`[Telemetry] Error: ${error.message}`, context || {});
  }
}
