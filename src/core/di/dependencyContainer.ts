// src/core/di/dependencyContainer.ts
import 'reflect-metadata';
import { container } from 'tsyringe';

// Importar servicios
import { AuthService } from '@core/security/AuthService';
import { EncryptionService } from '@core/security/EncryptionService';
import { KeychainService } from '@core/security/KeychainService';

// Importar la instancia de la base de datos WatermelonDB
import { database } from '@infrastructure/storage/Database';

// Importar el repositorio de usuario actualizado (WatermelonUserRepository)
import WatermelonUserRepository from '@infrastructure/data/repositories/WatermelonUserRepository';
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

// Verificar e inyectar la instancia de la base de datos en el contenedor DI
if (!database) {
  throw new Error('❌ No se pudo inicializar la base de datos');
}
container.registerInstance('DatabaseClient', database);

// Registrar el repositorio de usuarios utilizando la implementación de WatermelonDB
container.register<IUserRepository>('IUserRepository', { useClass: WatermelonUserRepository });

export { container };
