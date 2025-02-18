// src/core/observability/services/TelemetryService.ts
import { AnalyticsAdapter } from '../adapters/AnalyticsAdapter';

/**
 * TelemetryService es un servicio singleton para capturar y enviar datos
 * de telemetría (eventos, errores, etc.) a un servicio de analíticas.
 */
class TelemetryService {
  private static instance: TelemetryService;
  private adapter: AnalyticsAdapter;

  private constructor(adapter: AnalyticsAdapter) {
    this.adapter = adapter;
  }

  /**
   * Inicializa el servicio de telemetría con un adaptador específico.
   * Esta función debe llamarse una sola vez (idealmente al inicio de la app).
   */
  public static initialize(adapter: AnalyticsAdapter): void {
    if (!TelemetryService.instance) {
      TelemetryService.instance = new TelemetryService(adapter);
    }
  }

  /**
   * Obtiene la instancia del servicio de telemetría.
   * Si no se ha inicializado, lanza un error.
   */
  public static getInstance(): TelemetryService {
    if (!TelemetryService.instance) {
      throw new Error('TelemetryService has not been initialized.');
    }
    return TelemetryService.instance;
  }

  /**
   * Registra un evento con datos opcionales.
   */
  public logEvent(eventName: string, data?: Record<string, any>): void {
    this.adapter.logEvent(eventName, data);
  }

  /**
   * Registra un error con un contexto opcional.
   */
  public logError(error: Error, context?: Record<string, any>): void {
    this.adapter.logError(error, context);
  }
}

export default TelemetryService;
