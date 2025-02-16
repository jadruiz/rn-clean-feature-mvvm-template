# 🛠 Configuración y Primeros Pasos

Esta guía te ayudará a configurar y ejecutar el proyecto correctamente.

---

## 📌 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- **Node.js** (versión recomendada: `>=18.x.x`)
- **npm** o **yarn** (gestor de paquetes)
- **React Native CLI** (`npx react-native`)
- **Expo CLI** (`npm install -g expo-cli`) (Opcional si usas Expo)
- **Xcode** (para iOS) y **Android Studio** (para Android)

---

## 📂 Clonando el Repositorio

```bash
git clone https://github.com/usuario/rn-clean-feature-mvvm-template.git
cd rn-clean-feature-mvvm-template
rm -rf .git
git init
git add .
git commit -m "Inicializando proyecto con el template"
```

---

## 📦 Instalación de Dependencias

```bash
npm install   # O usa yarn install
```

### 📍 Configurar Variables de Entorno

El proyecto usa archivos `.env` para manejar configuraciones por entorno.

1. Copia el archivo de ejemplo y personalízalo:

```bash
cp .env.example .env.development
cp .env.example .env.staging
cp .env.example .env.production
```

2. Modifica `.env.development` con tus credenciales:

```
API_URL=https://api.dev.miapp.com
APP_NAME=MiApp
LOG_LEVEL=debug
```

3. Usa `react-native-dotenv` para acceder a las variables:

```typescript
import { API_URL } from '@env';
console.log(API_URL);
```

---

## 🏗️ Configuración de Proyecto

### 1️⃣ **Configurar alias de rutas**

Este template usa alias para facilitar la importación de módulos. Configura `metro.config.js` y `tsconfig.json`:

#### `metro.config.js`
```javascript
const path = require('path');
module.exports = {
  resolver: {
    alias: {
      '@core': path.resolve(__dirname, 'src/core'),
      '@domain': path.resolve(__dirname, 'src/domain'),
      '@infra': path.resolve(__dirname, 'src/infrastructure'),
      '@presentation': path.resolve(__dirname, 'src/presentation'),
      '@a11y': path.resolve(__dirname, 'src/a11y'),
      '@i18n': path.resolve(__dirname, 'src/i18n'),
      '@navigation': path.resolve(__dirname, 'src/navigation'),
    },
  },
};
```

#### `tsconfig.json`
```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@core/*": ["src/core/*"],
      "@domain/*": ["src/domain/*"],
      "@infra/*": ["src/infrastructure/*"],
      "@presentation/*": ["src/presentation/*"],
      "@a11y/*": ["src/a11y/*"],
      "@i18n/*": ["src/i18n/*"],
      "@navigation/*": ["src/navigation/*"]
    }
  }
}
```

---

### 2️⃣ **Configuración de Navegación**

Este template usa **React Navigation** con TypeScript. Instálalo:

```bash
npm install @react-navigation/native @react-navigation/stack
```

Luego, configura la navegación en `src/navigation/AppNavigator.tsx`:

```typescript
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@presentation/features/home/HomeScreen';
import LoginScreen from '@presentation/features/auth/LoginScreen';

const Stack = createStackNavigator();
export function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
```

---

## 🚀 Ejecución del Proyecto

### 🔧 **Ejecutar en Android**

```bash
npx react-native run-android
```

### 🍏 **Ejecutar en iOS**

```bash
cd ios && pod install && cd ..
npx react-native run-ios
```

### 🖥 **Ejecutar con Expo (Opcional)**

Si usas Expo, ejecuta:

```bash
npx expo start
```

---

## ✅ **Verificación de Instalación**

Después de iniciar la app, deberías ver la pantalla de inicio con el logo del proyecto.

Si encuentras problemas, revisa:

- `adb devices` (para asegurarte de que el emulador/dispositivo está conectado)
- `npm start --reset-cache` (para limpiar el caché de metro bundler)
- Archivos `.env` correctamente configurados

---

## 📚 Recursos Adicionales

- [📄 Documentación Oficial de React Native](https://reactnative.dev/docs/getting-started)
- [📄 Configuración de TypeScript en React Native](https://reactnative.dev/docs/typescript)
- [📄 React Navigation](https://reactnavigation.org/)
- [📄 Manejo de variables de entorno](https://www.npmjs.com/package/react-native-dotenv)

🚀 **¡Tu proyecto ya está listo para comenzar!** 🎯

