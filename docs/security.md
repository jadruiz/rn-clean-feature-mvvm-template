# Seguridad en el Template

Este documento describe las abstracciones y buenas prácticas implementadas en el template para gestionar aspectos críticos de la seguridad, tales como autenticación, cifrado, almacenamiento seguro y autenticación biométrica. La arquitectura de seguridad sigue los principios de Clean Architecture, promoviendo el desacoplamiento y la escalabilidad.

---

## Tabla de Contenidos

- [Introducción](#introducci%C3%B3n)
- [Servicios de Seguridad](#servicios-de-seguridad)
  - [AuthService](#authservice)
  - [EncryptionService](#encryptionservice)
  - [KeychainService](#keychainservice)
  - [BiometricService](#biometricservice)
  - [SecureConfig](#secureconfig)
- [Buenas Prácticas](#buenas-pr%C3%A1cticas)
- [Integración con Logging y Telemetría](#integraci%C3%B3n-con-logging-y-telemetr%C3%ADa)
- [Consideraciones Adicionales](#consideraciones-adicionales)

---

## Introducción

El template incorpora diversas abstracciones para gestionar la seguridad de la aplicación de manera modular y escalable. Cada servicio está diseñado para encargarse de una única responsabilidad, lo que facilita su mantenimiento y actualización. Además, estos servicios se integran con el sistema de logging y telemetría para proporcionar una trazabilidad completa de eventos y errores relacionados con la seguridad.

---

## Servicios de Seguridad

### AuthService

- **Ubicación:** `src/core/security/AuthService.ts`
- **Descripción:**  
  Gestiona la lógica de autenticación, incluyendo métodos para:
  - **Login:** Simula la autenticación y retorna un token.
  - **Logout:** Limpia la información de autenticación.
  - **RefreshToken:** Actualiza el token de autenticación.

- **Ejemplo de uso:**
  ```ts
  const authService = new AuthService();
  authService.login('usuario', 'contraseña')
    .then(token => {
      // Token obtenido
    })
    .catch(error => {
      // Manejo de error
    });
  ```

### EncryptionService

- **Ubicación:** `src/core/security/EncryptionService.ts`
- **Descripción:**
  - Proporciona métodos para cifrar y descifrar datos sensibles utilizando CryptoJS.
  - La clave secreta se obtiene de la configuración centralizada (a través de `Config`), lo que permite cambiarla sin modificar el código fuente.

- **Código:**
  ```ts
  import CryptoJS from 'crypto-js';
  import { Config } from '@core/config/environment/EnvConfig';

  const SECRET_KEY = Config.get<string>('SECRET_KEY');

  export class EncryptionService {
    static encrypt(text: string): string {
      return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
    }

    static decrypt(cipherText: string): string {
      const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
      return bytes.toString(CryptoJS.enc.Utf8);
    }
  }
  ```

### KeychainService

- **Ubicación:** `src/core/security/KeychainService.ts`
- **Descripción:**
  - Implementa abstracciones para almacenar datos sensibles de forma segura en el dispositivo, utilizando `expo-secure-store`.
  - Permite guardar, recuperar y eliminar información de manera cifrada y segura.

- **Código:**
  ```ts
  import * as SecureStore from 'expo-secure-store';

  export class KeychainService {
    static async setItem(key: string, value: string): Promise<void> {
      await SecureStore.setItemAsync(key, value);
    }

    static async getItem(key: string): Promise<string | null> {
      return await SecureStore.getItemAsync(key);
    }

    static async deleteItem(key: string): Promise<void> {
      await SecureStore.deleteItemAsync(key);
    }
  }
  ```

### BiometricService

- **Ubicación:** `src/core/security/BiometricService.ts`
- **Descripción:**
  - Facilita la autenticación biométrica (por ejemplo, huella digital o reconocimiento facial) mediante `expo-local-authentication`.
  - Permite verificar la disponibilidad de hardware biométrico y ejecutar autenticación.

- **Código:**
  ```ts
  import * as LocalAuthentication from 'expo-local-authentication';

  export class BiometricService {
    static async hasHardwareAsync(): Promise<boolean> {
      return await LocalAuthentication.hasHardwareAsync();
    }

    static async isEnrolledAsync(): Promise<boolean> {
      return await LocalAuthentication.isEnrolledAsync();
    }

    static async authenticateAsync(): Promise<boolean> {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Autenticación requerida',
        fallbackLabel: 'Usar PIN',
      });
      return result.success;
    }
  }
  ```

### SecureConfig

- **Ubicación:** `src/core/config/security/SecureConfig.ts`
- **Descripción:**
  - Gestiona la carga y validación de configuraciones sensibles.
  - Utiliza el sistema de configuración centralizado (`Config`) para obtener variables de entorno (por ejemplo, con el prefijo `EXPO_PUBLIC_`).
  - Reporta advertencias si alguna clave requerida no está definida.

- **Código:**
  ```ts
  import { Logger, consoleAdapter, LogLevel } from '@core/logging';
  import { Config } from '@core/config/environment/EnvConfig';

  const logger = new Logger(consoleAdapter, LogLevel.INFO);

  export class SecureConfig {
    static get(key: string): string {
      const value = Config.get<string>(key);
      if (!value) {
        logger.warn(`La configuración segura para "${key}" no está definida.`);
        return '';
      }
      return value;
    }
  }
  ```

---
## Consideraciones Adicionales

- **Variables Públicas vs. Secretas:** `EXPO_PUBLIC_` se usa en variables accesibles desde el cliente.
- **Actualizaciones y Parches:** Mantener las dependencias de seguridad actualizadas.
- **Pruebas y Auditorías:** Realizar auditorías de código para identificar vulnerabilidades.

Con estas prácticas, el template proporciona una base sólida para la seguridad en aplicaciones React Native, facilitando su mantenimiento y escalabilidad.

