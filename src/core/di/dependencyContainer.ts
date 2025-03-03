// src/core/di/dependencyContainer.ts
import 'reflect-metadata';
import { container } from 'tsyringe';

// Importar servicios
import { AuthService } from '@core/security/AuthService';
import { EncryptionService } from '@core/security/EncryptionService';
import { KeychainService } from '@core/security/KeychainService';
import { initializeDatabase } from '@infrastructure/storage/Database';
import { DrizzleUserRepository } from '@infrastructure/data/repositories/DrizzleUserRepository';
import { IUserRepository } from '@domain/repositories/IUserRepository';

// Registro de servicios
container.register<AuthService>('AuthService', { useClass: AuthService });
container.register<EncryptionService>('EncryptionService', { useClass: EncryptionService });
container.register<KeychainService>('KeychainService', { useClass: KeychainService });

// Registro de adaptadores de estado
import { ReduxAdapter } from '@core/state/adapters/ReduxAdapter';
import { MemoryAdapter } from '@core/state/adapters/MemoryAdapter';
import { IStateAdapter } from '@core/state/interfaces/IStateAdapter';
import { RootState } from '@core/state/redux/store';

container.register<IStateAdapter<RootState>>('ReduxAdapter', { useClass: ReduxAdapter });
container.register<IStateAdapter<RootState>>('MemoryAdapter', { useClass: MemoryAdapter });

// Inicializar base de datos y registrarla en el contenedor DI
const dbClient = initializeDatabase();
if (!dbClient) {
  throw new Error('❌ No se pudo inicializar la base de datos');
}
container.registerInstance('DatabaseClient', dbClient);

// Registrar el repositorio de usuarios
container.register<IUserRepository>('IUserRepository', { useClass: DrizzleUserRepository });

export { container };
