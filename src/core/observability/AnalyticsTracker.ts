// src/core/observability/AnalyticsTracker.ts

import { Logger, consoleAdapter, LogLevel } from '@core/logging';
import TelemetryService from '@core/telemetry/TelemetryService';

const logger = new Logger(consoleAdapter, LogLevel.INFO);

/**
 * AnalyticsTracker se encarga de capturar eventos específicos de negocio
 * o embudos de conversión, y enviarlos a TelemetryService (u otros servicios externos).
 */
export class AnalyticsTracker {
  static trackFeatureUsage(featureName: string, details?: Record<string, any>) {
    logger.info(`Tracking feature usage: ${featureName}`, details);
    TelemetryService.getInstance().logEvent(
      `FeatureUsed_${featureName}`,
      details,
    );
  }

  /*
  static trackPurchase(purchaseId: string, amount: number) {
    logger.info('Tracking purchase', { purchaseId, amount });
    TelemetryService.getInstance().logEvent('Purchase', { purchaseId, amount });
  }*/
}
