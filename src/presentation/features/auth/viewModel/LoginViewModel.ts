// src/presentation/features/auth/viewModel/LoginViewModel.ts
import { useState } from 'react';
import { User } from '@domain/entities/User';
import { LoginUseCase } from '@domain/useCases/LoginUseCase';
import { SyncAuthUseCase } from '@domain/useCases/SyncAuthUseCase';
import { Logger, LogLevel } from '@core/logging/Logger';
import { consoleAdapter } from '@core/logging/adapters/consoleAdapter';

const logger = new Logger(consoleAdapter, LogLevel.DEBUG);

export const useLoginViewModel = (
  loginUseCase: LoginUseCase,
  syncAuthUseCase: SyncAuthUseCase,
) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      logger.info('Ejecutando LoginUseCase...');
      const loggedUser = await loginUseCase.execute(username, password);
      setUser(loggedUser);
      logger.info('Login exitoso');
    } catch (err: any) {
      logger.error('Error en login', err);
      setError(err.message || 'Error en el login');
    } finally {
      setLoading(false);
    }
  };

  const syncAuth = async () => {
    try {
      logger.info('Ejecutando SyncAuthUseCase...');
      const syncedUser = await syncAuthUseCase.execute();
      setUser(syncedUser);
      logger.info('Sincronización de autenticación completada');
    } catch (err: any) {
      logger.error('Error en sincronización', err);
      // Puedes actualizar el estado de error o manejarlo de otra manera
    }
  };

  return {
    user,
    loading,
    error,
    login,
    syncAuth,
  };
};
