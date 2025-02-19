// src/infrastructure/repositories/AuthRepository.ts
import {
  IAuthRepository,
  PendingOperation,
} from '@domain/repositories/IAuthRepository';
import { User } from '@domain/entities/User';
import { LocalAuthStorage } from '@infrastructure/storage/LocalAuthStorage';

export class AuthRepository implements IAuthRepository {
  /**
   * Guarda la información de autenticación del usuario utilizando el servicio de almacenamiento local.
   */
  async saveUser(user: User): Promise<void> {
    await LocalAuthStorage.persistUser(user);
  }

  /**
   * Recupera la información de autenticación del usuario del almacenamiento local.
   */
  async getUser(): Promise<User | null> {
    return await LocalAuthStorage.retrieveUser();
  }

  /**
   * Elimina la información de autenticación del usuario del almacenamiento local.
   */
  async removeUser(): Promise<void> {
    await LocalAuthStorage.clearUser();
  }

  /**
   * Opcional: Permite procesar en lote operaciones pendientes.
   * Este método se utilizaría en la sincronización offline.
   */
  async batchProcess(operations: PendingOperation[]): Promise<void> {
    // Aquí podrías iterar sobre las operaciones y procesarlas.
    // Por ejemplo, si cada operación es de tipo 'LOGIN', podrías reintentar el login con esos datos.
    // En este ejemplo, simplemente se simula el procesamiento.
    for (const op of operations) {
      console.log(`Procesando operación: ${op.type}`, op.payload);
      // Lógica de procesamiento...
    }
  }
}
