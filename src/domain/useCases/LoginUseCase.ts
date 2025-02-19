// src/domain/useCases/LoginUseCase.ts
import { User } from '@domain/entities/User';
import { IAuthRepository } from '@domain/repositories/IAuthRepository';

export class LoginUseCase {
  private authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository;
  }

  /**
   * Ejecuta el proceso de login.
   * - Valida que las credenciales sean válidas.
   * - Crea la entidad User (en un escenario real se validaría contra datos locales o de cache).
   * - Persiste el usuario a través del repositorio.
   */
  async execute(username: string, password: string): Promise<User> {
    if (!username || !password) {
      throw new Error('Credenciales inválidas');
    }

    // Simulación: crea un usuario dummy.
    // En una implementación real, podrías validar contra datos locales.
    const user: User = {
      id: 'user-' + Date.now(),
      username,
      token: 'dummy-token-' + Date.now(),
      timestamp: Date.now(),
    };

    // Persiste el usuario usando el repositorio
    await this.authRepository.saveUser(user);
    return user;
  }
}
