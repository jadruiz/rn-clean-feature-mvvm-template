// src/domain/useCases/user/AuthenticateUserUseCase.ts
import { IUserRepository } from '../../repositories/IUserRepository';
import { User } from '../../entities/User';
import { EncryptionService } from '@core/security/EncryptionService';

export class AuthenticateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(username: string, password: string): Promise<User | null> {
    // Obtener usuario por username
    const user = await this.userRepository.getUserByUsername(username);
    if (!user) return null;

    // Verificar que la cuenta esté activa
    if (!user.isActive()) {
      throw new Error(`Account is ${user.status}`);
    }

    // Verificar contraseña (asumiendo que EncryptionService.decrypt devuelve la contraseña original)
    const decryptedPassword = EncryptionService.decrypt(user.password);
    if (decryptedPassword !== password) {
      return null;
    }

    // Registrar el inicio de sesión y devolver el usuario actualizado
    return this.userRepository.recordLogin(user.id);
  }
}
