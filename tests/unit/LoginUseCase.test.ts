// src/tests/unit/LoginUseCase.test.ts
import { LoginUseCase } from '@domain/useCases/LoginUseCase';
import { IAuthRepository } from '@domain/repositories/IAuthRepository';
import { User } from '@domain/entities/User';

class DummyAuthRepository implements IAuthRepository {
  private user: User | null = null;

  async saveUser(user: User): Promise<void> {
    this.user = user;
  }

  async getUser(): Promise<User | null> {
    return this.user;
  }

  async removeUser(): Promise<void> {
    this.user = null;
  }

  // Implementación opcional de batchProcess para pruebas, si se necesita
  async batchProcess(operations: any[]): Promise<void> {
    // Simulación: se asume que las operaciones se procesan correctamente
    return;
  }
}

describe('LoginUseCase', () => {
  let authRepository: DummyAuthRepository;
  let loginUseCase: LoginUseCase;

  beforeEach(() => {
    authRepository = new DummyAuthRepository();
    loginUseCase = new LoginUseCase(authRepository);
  });

  it('debería lanzar error si las credenciales están vacías', async () => {
    await expect(loginUseCase.execute('', '')).rejects.toThrow(
      'Credenciales inválidas',
    );
  });

  it('debería retornar un usuario y persistirlo', async () => {
    const username = 'testuser';
    const password = 'password123';
    const user = await loginUseCase.execute(username, password);
    expect(user).toBeDefined();
    expect(user.username).toBe(username);
    const persistedUser = await authRepository.getUser();
    expect(persistedUser).toEqual(user);
  });
});
