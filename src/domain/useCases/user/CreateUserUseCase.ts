// src/domain/useCases/user/CreateUserUseCase.ts
import { IUserRepository } from '@domain/repositories/IUserRepository';
import { NewUserData, UserEntity } from '@domain/entities/User';

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userData: NewUserData): Promise<UserEntity> {
    return await this.userRepository.createUser(userData);
  }
}
