// src/domain/useCases/user/GetUserByIdUseCase.ts
import { IUserRepository } from '../../repositories/IUserRepository';
import { User } from '../../entities/User';

export class GetUserByIdUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<User | null> {
    return this.userRepository.getUserById(id);
  }
}
