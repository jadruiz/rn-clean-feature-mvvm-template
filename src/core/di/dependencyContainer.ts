// src/core/di/dependencyContainer.ts
import 'reflect-metadata';
import { container } from 'tsyringe';

// Importa tus servicios existentes
import { AuthService } from '@core/security/AuthService';
import { EncryptionService } from '@core/security/EncryptionService';
import { KeychainService } from '@core/security/KeychainService';

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

export { container };
