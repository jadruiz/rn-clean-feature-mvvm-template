// src/domain/useCases/SyncAuthUseCase.ts
import { IAuthRepository } from '@domain/repositories/IAuthRepository';
import { User } from '@domain/entities/User';

export class SyncAuthUseCase {
  private authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository;
  }

  /**
   * Ejecuta la sincronización de autenticación.
   * - Recupera el usuario almacenado.
   * - Aquí se podría agregar lógica para revalidar el token, refrescar la sesión, etc.
   */
  async execute(): Promise<User | null> {
    const user = await this.authRepository.getUser();
    if (!user) {
      throw new Error('No hay usuario almacenado para sincronizar');
    }

    // Lógica opcional para verificar o refrescar el token
    // Ejemplo: si el token está por expirar, llamar a un método para refrescarlo.
    // En este ejemplo, se retorna el usuario sin modificaciones.
    return user;
  }
}
