// src/core/auth/AuthService.ts
import { injectable } from 'tsyringe';
import { User } from '@domain/entities/User';
import { IAuthRepository } from '@domain/repositories/IAuthRepository';
import { SecureStore } from '@core/auth/SecureStore';
import { SessionManager } from '@core/auth/SessionManager';
import { Logger, LogLevel } from '@core/logging/Logger';
import { consoleAdapter } from '@core/logging/adapters/consoleAdapter';

const logger = new Logger(consoleAdapter, LogLevel.DEBUG);

@injectable()
export class AuthService {
  private authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository;
  }

  /**
   * Realiza el login offline-first.
   * - Valida que las credenciales no estén vacías.
   * - Crea un usuario dummy (para simular el login offline).
   * - Guarda el token de forma segura y persiste el usuario.
   */
  async login(username: string, password: string): Promise<User> {
    if (!username || !password) {
      logger.error('Credenciales inválidas');
      throw new Error('Credenciales inválidas');
    }

    // Simulación de login offline: crea un usuario dummy.
    const user: User = {
      id: 'user-' + Date.now(),
      username,
      token: 'dummy-token-' + Date.now(),
      timestamp: Date.now(),
    };

    try {
      // Guarda el token de forma segura
      await SecureStore.setItem('authToken', user.token);
      logger.info('Token guardado de forma segura');

      // Inicia la sesión en memoria
      SessionManager.startSession(user);
      logger.info(`Sesión iniciada para el usuario ${user.username}`);

      // Persiste el usuario en el repositorio para sincronización offline
      await this.authRepository.saveUser(user);
      logger.info('Usuario persistido en el repositorio');
    } catch (error) {
      logger.error('Error en el login', error);
      throw error;
    }

    return user;
  }

  /**
   * Realiza el logout, limpiando la sesión y borrando datos seguros.
   */
  async logout(): Promise<void> {
    try {
      SessionManager.endSession();
      await SecureStore.removeItem('authToken');
      await this.authRepository.removeUser();
      logger.info('Sesión finalizada y datos de autenticación eliminados');
    } catch (error) {
      logger.error('Error en el logout', error);
      throw error;
    }
  }
}
