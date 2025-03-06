// src/domain/useCases/user/UpdateUserStatusUseCase.ts
import { IUserRepository } from '@domain/repositories/IUserRepository';
import { UserEntity, UserStatus } from '@domain/entities/User';

export class UpdateUserStatusUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string, status: UserStatus): Promise<UserEntity> {
    return await this.userRepository.updateUserStatus(id, status);
  }
}
