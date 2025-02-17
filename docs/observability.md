# Observabilidad

Este documento describe cómo el proyecto maneja la observabilidad, enfocándose en la recolección de métricas de rendimiento y el seguimiento de eventos importantes para la aplicación. El objetivo es proporcionar información en tiempo real sobre el **estado** y el **comportamiento** de la app, facilitando la detección de problemas y la toma de decisiones basadas en datos.

---

## Tabla de Contenidos

- [Introducción](#introducción)
- [Objetivos de la Observabilidad](#objetivos-de-la-observabilidad)
- [Estructura y Ubicación](#estructura-y-ubicación)
- [Componentes de Observabilidad](#componentes-de-observabilidad)
  - [AnalyticsTracker](#analyticstracker)
  - [PerformanceMonitor](#performancemonitor)
- [Integración con Telemetría y Logging](#integración-con-telemetría-y-logging)
- [Buenas Prácticas](#buenas-prácticas)
- [Ejemplos de Uso](#ejemplos-de-uso)
- [Consideraciones Adicionales](#consideraciones-adicionales)

---

## Introducción

La **observabilidad** permite entender cómo se comporta la aplicación en **tiempo real** y detectar cuellos de botella, errores y oportunidades de mejora. Se basa en la recolección y análisis de métricas, logs y trazas que describen lo que sucede en el sistema.

En este template, la observabilidad se implementa principalmente mediante dos componentes:

1. **AnalyticsTracker**: Centraliza la captura de eventos de negocio (por ejemplo, uso de features, embudos de conversión).
2. **PerformanceMonitor**: Mide y reporta métricas de rendimiento (tiempos de carga, latencias, etc.).

---

## Objetivos de la Observabilidad

- **Transparencia**: Proporcionar visibilidad del estado de la app (rendimiento, uso de features, errores) en tiempo real.
- **Rápida Detección de Problemas**: Identificar y aislar fallas o cuellos de botella antes de que afecten a los usuarios.
- **Toma de Decisiones Basadas en Datos**: Analizar la efectividad de nuevas funcionalidades, embudos de conversión y métricas de retención.
- **Evolución Continua**: Retroalimentar el ciclo de desarrollo con información real de uso y rendimiento.

---

## Estructura y Ubicación

Los archivos relacionados con la observabilidad se encuentran en la carpeta `src/core/observability/`:

- **AnalyticsTracker.ts**: Módulo encargado de registrar eventos específicos de negocio y enviarlos a la capa de telemetría.
- **PerformanceMonitor.ts**: Módulo para medir tiempos y latencias, reportando métricas de rendimiento a la capa de telemetría.

---

## Componentes de Observabilidad

### AnalyticsTracker

Este archivo centraliza la lógica de **tracking** de eventos de negocio. Utiliza el sistema de **telemetría** y el **logger** para reportar:

- **Eventos de uso** (ej. "FeatureUsed_Auth").
- **Embudo de conversión** (compras, registros, etc.).
- **Eventos de retención** (ej. número de sesiones, screens visitadas, etc.).

```ts
// src/core/observability/AnalyticsTracker.ts
import { Logger, consoleAdapter, LogLevel } from '@core/logging';
import TelemetryService from '@core/telemetry/TelemetryService';

const logger = new Logger(consoleAdapter, LogLevel.INFO);

export class AnalyticsTracker {
  static trackFeatureUsage(featureName: string, details?: Record<string, any>) {
    logger.info(`Tracking feature usage: ${featureName}`, details);
    TelemetryService.getInstance().logEvent(`FeatureUsed_${featureName}`, details);
  }
}
```

---

### PerformanceMonitor

Este archivo se encarga de medir métricas de rendimiento, como:

- **Tiempos de arranque** (App startup time).
- **Tiempos de carga de pantallas** (Screen load).
- **Latencias en operaciones críticas** (por ejemplo, llamadas a APIs).

```ts
// src/core/observability/PerformanceMonitor.ts
import { Logger, consoleAdapter, LogLevel } from '@core/logging';
import TelemetryService from '@core/telemetry/TelemetryService';

const logger = new Logger(consoleAdapter, LogLevel.INFO);

export class PerformanceMonitor {
  private static timings: Record<string, number> = {};

  static start(metricName: string) {
    PerformanceMonitor.timings[metricName] = performance.now();
    logger.debug(`Performance monitor start: ${metricName}`);
  }

  static end(metricName: string) {
    const startTime = PerformanceMonitor.timings[metricName];
    if (!startTime) {
      logger.warn(`No start time found for metric: ${metricName}`);
      return;
    }
    const endTime = performance.now();
    const duration = endTime - startTime;

    logger.info(`Performance metric: ${metricName}`, { duration });
    TelemetryService.getInstance().logEvent(`Perf_${metricName}`, { duration });

    delete PerformanceMonitor.timings[metricName];
  }
}
```

---

## Integración con Telemetría y Logging

Los componentes de observabilidad hacen uso de:

- **TelemetryService** (en `src/core/telemetry/`)
  - Envía eventos y métricas a un servicio externo (Firebase, Sentry, Datadog, etc.).
- **Logger** (en `src/core/logging/`)
  - Registra mensajes y errores de forma estructurada (por ejemplo, en consola o en un archivo).

---

## Buenas Prácticas

- **Definir Eventos y Métricas Clave**.
- **Centralizar la Lógica** en `AnalyticsTracker` y `PerformanceMonitor`.
- **Automatizar** con hooks o middlewares.
- **Mantener la Consistencia** en nombres de eventos y métricas.

---

## Consideraciones Adicionales

- **Protección de Datos**: No registrar información sensible en logs o telemetría.
- **Umbrales y Alertas**: Definir límites críticos en métricas para alertar fallas.
- **Evaluación Continua**: Revisar periódicamente las métricas para detectar tendencias.