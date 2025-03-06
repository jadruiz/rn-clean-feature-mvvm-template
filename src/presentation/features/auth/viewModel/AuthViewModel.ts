// src/presentation/features/auth/viewModel/AuthViewModel.ts
import { injectable, inject } from 'tsyringe';
import { CreateUserUseCase } from '@domain/useCases/user/CreateUserUseCase';
import { GetUserByIdUseCase } from '@domain/useCases/user/GetUserByIdUseCase';
import { UpdateUserStatusUseCase } from '@domain/useCases/user/UpdateUserStatusUseCase';
import { IUserRepository } from '@domain/repositories/IUserRepository';
import { NewUserData, UserStatus } from '@domain/entities/User';

@injectable()
export class AuthViewModel {
  private createUserUseCase: CreateUserUseCase;
  private getUserByIdUseCase: GetUserByIdUseCase;
  private updateUserStatusUseCase: UpdateUserStatusUseCase;

  constructor(@inject('IUserRepository') userRepository: IUserRepository) {
    this.createUserUseCase = new CreateUserUseCase(userRepository);
    this.getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
    this.updateUserStatusUseCase = new UpdateUserStatusUseCase(userRepository);
  }

  async registerUser(userData: NewUserData) {
    return await this.createUserUseCase.execute(userData);
  }

  async getUserById(id: string) {
    return await this.getUserByIdUseCase.execute(id);
  }

  async updateUserStatus(id: string, status: UserStatus) {
    return await this.updateUserStatusUseCase.execute(id, status);
  }
}
