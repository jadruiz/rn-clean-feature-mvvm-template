# 🛠 Configuración y Setup del Proyecto

Este documento describe la configuración inicial del proyecto y las buenas prácticas aplicadas para garantizar modularidad, escalabilidad y mantenimiento eficiente.

---

## 📌 Abstracciones y Principios de Diseño

El proyecto sigue una arquitectura basada en **Clean Architecture** y **Feature-Based Architecture**, combinada con **MVVM** (Model-View-ViewModel) para separar la lógica de presentación de la lógica de negocio.

### 🔹 Configuración Centralizada con el ConfigAdapter
- Se usa el patrón **Singleton** para garantizar que la configuración sea única en toda la aplicación.
- **Carga de Configuración Dinámica**: Obtiene valores desde `.env` o `app.json`.
- **Uso del prefijo `EXPO_PUBLIC_`**: Todas las variables de entorno se acceden usando este prefijo, en conformidad con las prácticas de Expo Bare Workflow.
- **Validación Automática**: Si falta una clave esencial, se lanza una advertencia.
- **Fácil Extensibilidad**: Se pueden agregar nuevas claves de configuración sin modificar la estructura base.

---

## 📺 Estructura de Configuración

📌 **Ubicación:** `src/core/config/environment/`

📁 **Archivos Claves:**
- `ConfigAdapter.ts` → Implementa la carga y validación de configuración.
- `EnvConfig.ts` → Punto de acceso central para recuperar configuraciones.

Ejemplo de acceso a la configuración en la aplicación:
```typescript
import { Config } from '@core/config/environment/EnvConfig';
console.log(Config.get('API_URL'));
```

---

## 📆 Agregando Nuevas Funcionalidades

El sistema de configuración permite agregar nuevas fuentes de datos de manera sencilla. Ejemplos:
- 🔹 **Integrar Firebase Remote Config** para ajustar configuraciones sin actualizar la app.
- 🔹 **Usar SQLite/MMKV** para persistir valores de configuración localmente.
- 🔹 **Extender ConfigAdapter** para incluir preferencias de usuario dinámicas.

---

## 🏧 Buenas Prácticas Aplicadas y Futuras

- ✅ **Principio de Única Responsabilidad (SRP)**: Cada módulo de configuración tiene una función clara y separada.
- ✅ **Desacoplamiento**: Se evita que la lógica de negocio dependa directamente de variables de entorno.
- ✅ **Extensibilidad**: Se puede ampliar sin modificar la estructura principal.

🚀 **Futuras Mejores Prácticas**:
- Implementar un **cache layer** para mejorar rendimiento.
- Agregar soporte para múltiples entornos en tiempo de ejecución.
- Incorporar validaciones avanzadas y fallback automático para configuraciones críticas.

Con esta estructura, el proyecto se mantiene flexible y escalable, asegurando una mejor organización y control sobre la configuración global de la aplicación.

## Ejemplo de Uso

En el archivo `App.tsx`:

```ts
import React from 'react';
import { Text, View } from 'react-native';
import { Config } from '@core/config/environment/EnvConfig';

export default function App() {
  const apiUrl = Config.get<string>('API_URL');
  return (
    <View>
      <Text>Base URL: {apiUrl}</Text>
    </View>
  );
}
```