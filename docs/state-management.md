# 📦 Gestión de Estado en el Template

Este documento describe cómo se maneja el estado global en el template, utilizando un enfoque modular y desacoplado para permitir la fácil sustitución de tecnologías sin afectar el resto de la aplicación.

---

## 🔹 Principios de Diseño

1. **Abstracción**: Se utiliza `IStateAdapter<T>` como interfaz genérica para desacoplar la implementación del almacenamiento del estado.
2. **Lazy Loading**: Se cargan dinámicamente los adaptadores (`ReduxAdapter`, `MemoryAdapter`) según la configuración.
3. **Fallback Automático**: En caso de error al cargar un adaptador, se usa Redux como predeterminado.
4. **Extensibilidad**: Se pueden agregar nuevos adaptadores sin modificar la estructura principal.

---

## 🏗️ Implementación de la Abstracción de Estado

### 📌 **Interfaz Base** (`IStateAdapter<T>`)

Define los métodos básicos para manejar el estado de forma independiente a la implementación:

```ts
export interface IStateAdapter<T> {
  getState: () => T;
  setState: (state: Partial<T>) => void;
  subscribe: (listener: (state: T) => void) => () => void;
}
```

### 📌 **Carga Dinámica de Adaptadores** (`adapters/index.ts`)

Permite seleccionar dinámicamente el adaptador adecuado según la configuración:

```ts
import { IStateAdapter } from '../interfaces/IStateAdapter';
import { RootState } from '../redux/store';
import { Config } from '@core/config/environment/EnvConfig';

const loadAdapter = async (
  adapter: 'redux' | 'memory',
): Promise<IStateAdapter<RootState>> => {
  try {
    if (adapter === 'redux') {
      const { ReduxAdapter } = await import('./ReduxAdapter');
      return new ReduxAdapter();
    } else {
      const { MemoryAdapter } = await import('./MemoryAdapter');
      return new MemoryAdapter();
    }
  } catch (error) {
    console.error(`Error cargando el adaptador "${adapter}"`, error);
    const { ReduxAdapter } = await import('./ReduxAdapter'); // Fallback
    return new ReduxAdapter();
  }
};

const adapterType =
  Config.get<'redux' | 'memory'>('EXPO_PUBLIC_STATE_ADAPTER') ?? 'redux';
export const getStateAdapter = async (): Promise<IStateAdapter<RootState>> =>
  loadAdapter(adapterType);
```

### 📌 **Uso del Adaptador en Hooks** (`hooks/useAuth.ts`)

Carga el adaptador de estado de manera asíncrona para evitar bloqueos en la UI:

```ts
import { useState, useEffect } from 'react';
import { getStateAdapter } from '../adapters';
import { IAppState } from '../interfaces/IAppState';

export const useAuth = () => {
  const [stateAdapter, setStateAdapter] =
    useState<IStateAdapter<IAppState> | null>(null);
  const [user, setUserState] = useState<string>('');

  useEffect(() => {
    getStateAdapter().then((adapter) => {
      setStateAdapter(adapter);
      setUserState(adapter.getState().auth.user);
    });
  }, []);

  const getUser = () =>
    stateAdapter ? stateAdapter.getState().auth.user : user;
  const setUser = (user: string) => {
    if (stateAdapter) {
      stateAdapter.setState({ auth: { user } });
      setUserState(user);
    }
  };

  return { getUser, setUser };
};
```

---

## 🚀 Cómo Agregar un Nuevo Adaptador de Estado

Si deseas incluir un nuevo sistema de gestión de estado como **Zustand**, **MobX**, o **Recoil**, sigue estos pasos:

1. **Crear el nuevo adaptador** (`MobXAdapter.ts`, `ZustandAdapter.ts`, etc.).
2. **Implementar la interfaz `IStateAdapter<T>`**.
3. **Agregarlo a `loadAdapter` en `adapters/index.ts`**.
4. **Actualizar la configuración (`EXPO_PUBLIC_STATE_ADAPTER`) para seleccionarlo dinámicamente.**

Ejemplo para agregar MobX:

```ts
if (adapter === 'mobx') {
  const { MobXAdapter } = await import('./MobXAdapter');
  return new MobXAdapter();
}
```

---

## 🔥 Beneficios de esta Arquitectura

✅ **Independencia Tecnológica:** Podemos cambiar Redux por otro sistema sin afectar la lógica de negocio.
✅ **Carga Asíncrona:** Reduce el tiempo de carga inicial y optimiza el rendimiento.
✅ **Fácil Expansión:** Se pueden agregar nuevos adaptadores sin modificar la estructura base.
✅ **Centralización de Estado:** Evita múltiples fuentes de verdad en la app.

Con este enfoque, garantizamos una gestión de estado modular, flexible y lista para escalar. 🎯
