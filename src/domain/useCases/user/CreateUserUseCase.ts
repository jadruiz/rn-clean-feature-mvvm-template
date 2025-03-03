// src/domain/useCases/user/CreateUserUseCase.ts
import { User, UserStatus } from '../../entities/User';
import { IUserRepository } from '../../repositories/IUserRepository';
import { EncryptionService } from '@core/security/EncryptionService';

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(params: {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    maternalName?: string;
  }): Promise<User> {
    // Verificar si el usuario ya existe
    const existingUser = await this.userRepository.getUserByUsername(
      params.username,
    );
    if (existingUser) {
      throw new Error('Username already exists');
    }

    // Encriptar la contraseña
    const encryptedPassword = EncryptionService.encrypt(params.password);

    // Crear usuario: se generará id, createdAt y updatedAt en el repositorio
    return this.userRepository.createUser({
      username: params.username,
      password: encryptedPassword,
      firstName: params.firstName,
      lastName: params.lastName,
      maternalName: params.maternalName,
      status: 'pending_verification',
    });
  }
}
