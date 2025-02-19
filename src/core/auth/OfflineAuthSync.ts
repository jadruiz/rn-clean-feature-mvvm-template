// src/core/auth/OfflineAuthSync.ts
import {
  IAuthRepository,
  PendingOperation,
} from '@domain/repositories/IAuthRepository';
import { LocalAuthStorage } from '@infrastructure/storage/LocalAuthStorage';

export class OfflineAuthSync {
  private authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository;
  }

  /**
   * Sincroniza las operaciones pendientes de autenticación.
   */
  async syncPendingOperations(): Promise<void> {
    const pendingOps: PendingOperation[] =
      await LocalAuthStorage.getPendingOperations();
    if (pendingOps.length === 0) return;

    try {
      if (this.authRepository.batchProcess) {
        await this.authRepository.batchProcess?.(pendingOps);
      } else {
        throw new Error('batchProcess no está implementado en el repositorio.');
      }

      await LocalAuthStorage.clearPendingOperations();
      console.log('Operaciones pendientes sincronizadas correctamente.');
    } catch (error) {
      console.error('Error al sincronizar operaciones pendientes:', error);
      // Aquí podrías implementar lógicas de reintentos o circuit breaker
      throw error;
    }
  }
}
