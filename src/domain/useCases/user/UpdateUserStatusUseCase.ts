// src/domain/useCases/user/UpdateUserStatusUseCase.ts
import { IUserRepository } from '../../repositories/IUserRepository';
import { User, UserStatus } from '../../entities/User';

export class UpdateUserStatusUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string, status: UserStatus): Promise<User> {
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return this.userRepository.updateUserStatus(id, status);
  }
}
