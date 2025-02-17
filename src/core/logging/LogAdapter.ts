// src/core/logging/LogAdapter.ts
import { LogLevel } from './Logger';

/**
 * Interfaz para cualquier Adaptador de Log.
 */
export interface ILogAdapter {
  log(level: LogLevel, message: string, meta?: any[]): void;
}

/**
 * Clase base que implementa ILogAdapter
 * y recibe una función handler para procesar los logs.
 */
export class LogAdapter implements ILogAdapter {
  private handler: (level: LogLevel, message: string, meta?: any[]) => void;

  constructor(
    handler: (level: LogLevel, message: string, meta?: any[]) => void,
  ) {
    this.handler = handler;
  }

  log(level: LogLevel, message: string, meta: any[] = []): void {
    this.handler(level, message, meta);
  }
}
