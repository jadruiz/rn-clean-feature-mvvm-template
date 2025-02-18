// tests/integration/authIntegration.test.ts
import { AuthService } from '@core/security/AuthService';
import { MemoryAdapter } from '@core/state/adapters/MemoryAdapter';

describe('Auth Integration (AuthService + MemoryAdapter)', () => {
  let memoryAdapter: MemoryAdapter;
  let authService: AuthService;

  beforeEach(() => {
    // Configura un MemoryAdapter limpio antes de cada test
    memoryAdapter = new MemoryAdapter();
    authService = new AuthService(); // Se puede inyectar dependencias
  });

  it('debe loguear al usuario y almacenar el token en el estado', async () => {
    // Simulas un login
    const result = await authService.login('user', 'password');
    // Verificas que se haya guardado algo en el memoryAdapter
    const state = memoryAdapter.getState();
    expect(state.auth.user).toBe('user');
    expect(state.auth.token).toBeTruthy();
  });
});
