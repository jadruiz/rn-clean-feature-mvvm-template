// src/core/auth/SessionManager.ts
import { User } from '@domain/entities/User';
import { Logger, LogLevel } from '@core/logging/Logger';
import { consoleAdapter} from '@core/logging/adapters/consoleAdapter';

const logger = new Logger(consoleAdapter, LogLevel.DEBUG);

export class SessionManager {
  private static currentUser: User | null = null;

  static startSession(user: User): void {
    this.currentUser = user;
    logger.info(`Sesión iniciada para el usuario ${user.username}`);
  }

  static getSession(): User | null {
    return this.currentUser;
  }

  static endSession(): void {
    logger.info(`Sesión finalizada para el usuario ${this.currentUser?.username}`);
    this.currentUser = null;
  }
}
