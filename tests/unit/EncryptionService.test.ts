// tests/unit/EncryptionService.test.ts
import { EncryptionService } from '@core/security/EncryptionService';

describe('EncryptionService (Unit)', () => {
  beforeAll(() => {
    // Para pruebas unitarias, configuramos la clave secreta directamente.
    // (Simula que ya se llamó a initSecretKey())
    (EncryptionService as any).secretKey = 'testSecretKey';
  });

  it('debe encriptar y desencriptar correctamente', () => {
    const original = 'Texto de prueba';
    const encrypted = EncryptionService.encrypt(original);
    const decrypted = EncryptionService.decrypt(encrypted);
    expect(decrypted).toBe(original);
  });

  it('debe lanzar error si no se ha inicializado la clave', () => {
    (EncryptionService as any).secretKey = null;
    expect(() => EncryptionService.encrypt('algo')).toThrowError(
      'EncryptionService no inicializado. Llama a initSecretKey() primero.',
    );
  });
});
