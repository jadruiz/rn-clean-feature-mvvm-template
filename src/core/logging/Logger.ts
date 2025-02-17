// src/core/logging/Logger.ts
export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

export interface ILogger {
  debug(message: string, ...meta: any[]): void;
  info(message: string, ...meta: any[]): void;
  warn(message: string, ...meta: any[]): void;
  error(message: string, ...meta: any[]): void;
}

import { LogAdapter } from './LogAdapter';

/**
 * Logger principal que usa un adaptador para procesar los logs.
 */
export class Logger implements ILogger {
  private adapter: LogAdapter;
  private currentLogLevel: LogLevel;

  constructor(adapter: LogAdapter, currentLogLevel: LogLevel = LogLevel.INFO) {
    this.adapter = adapter;
    this.currentLogLevel = currentLogLevel;
  }

  private shouldLog(level: LogLevel): boolean {
    // Asigna prioridad a cada nivel para filtrar logs.
    const priority: Record<LogLevel, number> = {
      [LogLevel.DEBUG]: 1,
      [LogLevel.INFO]: 2,
      [LogLevel.WARN]: 3,
      [LogLevel.ERROR]: 4,
    };
    return priority[level] >= priority[this.currentLogLevel];
  }

  debug(message: string, ...meta: any[]): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      this.adapter.log(LogLevel.DEBUG, message, meta);
    }
  }

  info(message: string, ...meta: any[]): void {
    if (this.shouldLog(LogLevel.INFO)) {
      this.adapter.log(LogLevel.INFO, message, meta);
    }
  }

  warn(message: string, ...meta: any[]): void {
    if (this.shouldLog(LogLevel.WARN)) {
      this.adapter.log(LogLevel.WARN, message, meta);
    }
  }

  error(message: string, ...meta: any[]): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      this.adapter.log(LogLevel.ERROR, message, meta);
    }
  }
}
