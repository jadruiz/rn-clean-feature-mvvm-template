# 🛠 Configuración de Variables de Entorno

Esta sección explica cómo configurar y utilizar variables de entorno en Expo para gestionar la configuración de tu aplicación de manera dinámica según el entorno (desarrollo, producción, etc.).

---

## 📌 ¿Qué son las Variables de Entorno?

Las variables de entorno son valores de configuración que puedes usar dentro de tu aplicación sin necesidad de codificarlos directamente en el código fuente. En Expo, te permiten gestionar la configuración de tu aplicación de manera dinámica, dependiendo del entorno (por ejemplo, desarrollo, producción, etc.).

---

## 📍 Tipos de Variables en Expo

### 🔹 **Variables Públicas**
Estas son accesibles desde el frontend de la aplicación (en el código JavaScript) y, por lo tanto, no deben contener información sensible. Se definen en el campo `extra` de tu archivo `app.config.js` o `app.json`.

### 🔹 **Variables Privadas**
Las variables privadas están destinadas a configuraciones sensibles (como claves secretas o credenciales de acceso) y no deben ser accesibles desde el frontend. Deben usarse solo en el backend o en builds nativos para garantizar la seguridad.

---

## 📝 Uso de Variables de Entorno en Expo

### Paso 1: Definir Variables en `app.config.js`

En Expo, las variables de entorno se definen dentro del campo `extra` de `app.config.js`. Este archivo es utilizado para la configuración de tu aplicación.

#### Ejemplo de `app.config.js`:

```javascript
export default {
  name: 'rn-clean-feature-mvvm-template',
  slug: 'rn-clean-feature-mvvm-template',
  version: '1.0.0',
  extra: {
    EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com',
    EXPO_PUBLIC_ENV: process.env.EXPO_PUBLIC_ENV || 'development',
    EXPO_PUBLIC_STATE_ADAPTER: process.env.EXPO_PUBLIC_STATE_ADAPTER || 'redux',
    EXPO_PUBLIC_ENABLE_NEW_AUTH_FLOW: process.env.EXPO_PUBLIC_ENABLE_NEW_AUTH_FLOW || 'true',
    EXPO_PUBLIC_ENABLE_ADVANCED_ANALYTICS: process.env.EXPO_PUBLIC_ENABLE_ADVANCED_ANALYTICS || 'true',
    EXPO_PUBLIC_DB_NAME: process.env.EXPO_PUBLIC_DB_NAME || 'example_rncfm.db',
    EXPO_PRIVATE_SECRET_KEY: process.env.EXPO_PRIVATE_SECRET_KEY || 'default_secret_key',
  },
};
```

### Paso 2: Acceder a las Variables en el Código

Dentro de tu código, puedes acceder a estas variables utilizando `Constants.manifest.extra`.

#### Ejemplo de uso en `ConfigAdapter.ts`:

```typescript
import Constants from 'expo-constants';

export class ConfigAdapter {
  private static instance: ConfigAdapter;
  private config: Record<string, any> = {};

  private constructor() {
    this.loadConfig();
  }

  public static getInstance(): ConfigAdapter {
    if (!ConfigAdapter.instance) {
      ConfigAdapter.instance = new ConfigAdapter();
    }
    return ConfigAdapter.instance;
  }

  private loadConfig() {
    const defaultConfig = {
      API_URL: 'https://fallback-url.com',
      ENV: 'development',
      APP_NAME: 'MyApp',
      VERSION: '1.0.0',
      SECRET_KEY: 'default_secret_key',
      STATE_ADAPTER: 'redux',
      ENABLE_NEW_AUTH_FLOW: false,
      ENABLE_ADVANCED_ANALYTICS: false,
    };

    const expoConfig = Constants.expoConfig?.extra || {};
    this.config = { ...defaultConfig, ...expoConfig };
  }

  public get<T = any>(key: string): T {
    return this.config[key] as T;
  }
}

export const Config = ConfigAdapter.getInstance();
```

### Paso 3: Configuración en `.env` para Diferentes Entornos

Puedes usar archivos `.env` para gestionar configuraciones diferentes según el entorno (desarrollo, producción, staging, etc.).

#### Ejemplo de archivo `.env.development`:

```ini
EXPO_PUBLIC_API_URL=https://api.development.com
EXPO_PUBLIC_ENV=development
EXPO_PUBLIC_STATE_ADAPTER=redux
EXPO_PUBLIC_ENABLE_NEW_AUTH_FLOW=true
EXPO_PUBLIC_ENABLE_ADVANCED_ANALYTICS=true
EXPO_PUBLIC_DB_NAME=example_rncfm.db
EXPO_PRIVATE_SECRET_KEY=dev_secret_key
```

### Paso 4: Acceder a las Variables en el Código

En tu aplicación, puedes acceder a estas variables de entorno usando `Config.get`.

#### Ejemplo:

```typescript
const apiUrl = Config.get<string>('API_URL');
console.log('API URL:', apiUrl);  // Output: https://api.development.com
```

---

## 🛠 Mejoras y Buenas Prácticas

### 🔒 Seguridad con Variables Privadas
No expongas claves sensibles (como claves de API o contraseñas) en el frontend. Utiliza variables privadas solo en el backend o en el contexto de builds nativos para mantener la seguridad de la aplicación.

### 🌍 Gestión de Entornos
Usa diferentes archivos `.env` para cada entorno, como `.env.production` o `.env.staging`, para gestionar configuraciones específicas y asegurarte de que cada entorno tiene su propia configuración independiente.

### ⚙️ Evitar el Uso Excesivo de Variables de Entorno
No uses variables de entorno para valores que no cambian entre entornos (por ejemplo, el nombre de la aplicación). Esto mantiene tu código más limpio y fácil de mantener.

### 🔄 Refactorización de Configuración
Si tienes muchas variables de entorno, organiza tu configuración en un archivo separado que contenga todos los valores predeterminados y un método para cargarlos de forma centralizada.