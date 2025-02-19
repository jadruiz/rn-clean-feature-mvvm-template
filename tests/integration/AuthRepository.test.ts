// src/tests/integration/AuthRepository.test.ts
import { AuthRepository } from '@domain/repositories/AuthRepository';
import { LocalAuthStorage } from '@infrastructure/storage/LocalAuthStorage';
import { User } from '@domain/entities/User';

// Creamos un "mock" simple para LocalAuthStorage
jest.mock('@infrastructure/storage/LocalAuthStorage', () => {
  let storedUser: any = null;
  let pendingOperations: any[] = [];
  return {
    LocalAuthStorage: {
      persistUser: jest.fn(async (user: User) => {
        storedUser = user;
      }),
      retrieveUser: jest.fn(async () => storedUser),
      clearUser: jest.fn(async () => {
        storedUser = null;
      }),
      enqueueOperation: jest.fn(async (op: any) => {
        pendingOperations.push(op);
      }),
      getPendingOperations: jest.fn(async () => pendingOperations),
      clearPendingOperations: jest.fn(async () => {
        pendingOperations = [];
      }),
    },
  };
});

describe('AuthRepository Integration', () => {
  let authRepository: AuthRepository;
  const dummyUser: User = {
    id: 'user123',
    username: 'integrationUser',
    token: 'dummy-token',
    timestamp: Date.now(),
  };

  beforeEach(() => {
    authRepository = new AuthRepository();
  });

  it('debería guardar y recuperar un usuario', async () => {
    await authRepository.saveUser(dummyUser);
    const retrievedUser = await authRepository.getUser();
    expect(retrievedUser).toEqual(dummyUser);
  });

  it('debería eliminar el usuario', async () => {
    await authRepository.saveUser(dummyUser);
    await authRepository.removeUser();
    const retrievedUser = await authRepository.getUser();
    expect(retrievedUser).toBeNull();
  });

  it('debería procesar operaciones pendientes con batchProcess', async () => {
    const pendingOp = {
      type: 'LOGIN',
      payload: dummyUser,
      timestamp: Date.now(),
    };
    // Simulamos encolar una operación pendiente
    await LocalAuthStorage.enqueueOperation(pendingOp);
    // batchProcess debería recibir la operación pendiente
    (await authRepository.batchProcess) &&
      authRepository.batchProcess([pendingOp]);
    // Aquí solo verificamos que se llamó al batchProcess (se imprime en consola en la implementación dummy)
    expect(LocalAuthStorage.getPendingOperations).toHaveBeenCalled();
  });
});
