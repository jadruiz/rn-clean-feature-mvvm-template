// src/core/logging/consoleAdapter.ts
import { LogAdapter } from '../LogAdapter';
import { LogLevel } from '../Logger';

/**
 * Adaptador de consola básico (sin JSON).
 * Imprime logs en consola de forma clásica.
 */
export const consoleAdapter = new LogAdapter(
  (level, message, meta: any[] = []) => {
    switch (level) {
      case LogLevel.DEBUG:
        console.debug(`[DEBUG]: ${message}`, ...meta);
        break;
      case LogLevel.INFO:
        console.info(`[INFO]: ${message}`, ...meta);
        break;
      case LogLevel.WARN:
        console.warn(`[WARN]: ${message}`, ...meta);
        break;
      case LogLevel.ERROR:
        console.error(`[ERROR]: ${message}`, ...meta);
        break;
      default:
        console.log(`[LOG]: ${message}`, ...meta);
        break;
    }
  },
);
