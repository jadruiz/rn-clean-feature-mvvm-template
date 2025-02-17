// src/core/di/dependencyContainer.ts
import { container } from 'tsyringe';

// Importa tus servicios
import { AuthService } from '@core/security/AuthService';
import { EncryptionService } from '@core/security/EncryptionService';
import { KeychainService } from '@core/security/KeychainService';

// Aquí registras las dependencias que deseas inyectar
// Para cada servicio, defines un "token" (por ejemplo, el nombre de la clase o un string)
container.register<AuthService>('AuthService', { useClass: AuthService });
container.register<EncryptionService>('EncryptionService', {
  useClass: EncryptionService,
});
container.register<KeychainService>('KeychainService', {
  useClass: KeychainService,
});

// Exporta el contenedor para usarlo en otras partes de la aplicación
export { container };
