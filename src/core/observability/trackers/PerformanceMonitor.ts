// src/core/observability/trackers/PerformanceMonitor.ts

import { Logger, consoleAdapter, LogLevel } from '@core/logging';
import TelemetryService from '@core/observability/services/TelemetryService';

const logger = new Logger(consoleAdapter, LogLevel.INFO);

export class PerformanceMonitor {
  private static timings: Record<string, number> = {};

  /**
   * Inicia un temporizador para una métrica de performance
   */
  static start(metricName: string) {
    PerformanceMonitor.timings[metricName] = performance.now();
    logger.debug(`Performance monitor start: ${metricName}`);
  }

  /**
   * Finaliza el temporizador y envía la métrica a TelemetryService
   */
  static end(metricName: string) {
    const startTime = PerformanceMonitor.timings[metricName];
    if (!startTime) {
      logger.warn(`No se encontró un inicio para la métrica: ${metricName}`);
      return;
    }
    const endTime = performance.now();
    const duration = endTime - startTime;
    logger.info(`Performance metric: ${metricName}`, { duration });

    // Enviamos la métrica a Telemetry
    TelemetryService.getInstance().logEvent(`Perf_${metricName}`, { duration });

    // Limpiamos la métrica
    delete PerformanceMonitor.timings[metricName];
  }
}
