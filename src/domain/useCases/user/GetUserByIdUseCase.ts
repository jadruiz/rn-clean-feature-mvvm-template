// src/domain/useCases/user/GetUserByIdUseCase.ts
import { IUserRepository } from '@domain/repositories/IUserRepository';
import { UserEntity } from '@domain/entities/User';

export class GetUserByIdUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<UserEntity> {
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return user;
  }
}
