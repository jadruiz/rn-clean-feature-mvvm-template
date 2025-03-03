// src/presentation/features/auth/viewModel/AuthViewModel.ts
import { RepositoryFactory } from '@infrastructure/data/factories/RepositoryFactory';
import { CreateUserUseCase } from '@domain/useCases/user/CreateUserUseCase';
import { AuthenticateUserUseCase } from '@domain/useCases/user/AuthenticateUserUseCase';
import { User } from '@domain/entities/User';

export class AuthViewModel {
  private createUserUseCase!: CreateUserUseCase;
  private authenticateUserUseCase!: AuthenticateUserUseCase;

  constructor() {
    this.init();
  }

  private async init() {
    const userRepository = await RepositoryFactory.createUserRepository();
    this.createUserUseCase = new CreateUserUseCase(userRepository);
    this.authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
  }

  async registerUser(userData: {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    maternalName?: string;
  }): Promise<User> {
    if (!this.createUserUseCase) {
      await this.init();
    }
    return this.createUserUseCase.execute(userData);
  }

  async login(username: string, password: string): Promise<User | null> {
    if (!this.authenticateUserUseCase) {
      await this.init();
    }
    return this.authenticateUserUseCase.execute(username, password);
  }
}
