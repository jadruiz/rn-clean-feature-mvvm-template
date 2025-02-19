// src/core/di/dependencyContainer.ts
import 'reflect-metadata';
import { container } from 'tsyringe';

// Registrar la implementación del repositorio de autenticación
import { IAuthRepository } from '@domain/repositories/IAuthRepository';
import { SQLiteAuthRepository } from '@infrastructure/data/repositories/SQLiteAuthRepository';

// De esta forma, cada vez que se inyecte "IAuthRepository" se utilizará SQLiteAuthRepository
container.register<IAuthRepository>('IAuthRepository', {
  useClass: SQLiteAuthRepository,
});

// Registrar el servicio de autenticación, que depende de IAuthRepository
import { AuthService } from '@core/auth/AuthService';
container.register<AuthService>('AuthService', { useClass: AuthService });

// Registro de otros servicios existentes
import { EncryptionService } from '@core/security/EncryptionService';
import { KeychainService } from '@core/security/KeychainService';

container.register<EncryptionService>('EncryptionService', {
  useClass: EncryptionService,
});
container.register<KeychainService>('KeychainService', {
  useClass: KeychainService,
});

// Registro de adaptadores de estado
import { ReduxAdapter } from '@core/state/adapters/ReduxAdapter';
import { MemoryAdapter } from '@core/state/adapters/MemoryAdapter';
import { IStateAdapter } from '@core/state/interfaces/IStateAdapter';
import { RootState } from '@core/state/redux/store';

container.register<IStateAdapter<RootState>>('ReduxAdapter', {
  useClass: ReduxAdapter,
});
container.register<IStateAdapter<RootState>>('MemoryAdapter', {
  useClass: MemoryAdapter,
});

export { container };
