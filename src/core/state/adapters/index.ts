// src/core/state/adapters/index.ts
import { IStateAdapter } from '../interfaces/IStateAdapter';
import { RootState } from '../redux/store';
import { Config } from '@core/config/environment/EnvConfig';

// 🔹 Función para cargar adaptadores dinámicamente (Lazy Load)
const loadAdapter = async (adapter: 'redux' | 'memory'): Promise<IStateAdapter<RootState>> => {
  try {
    if (adapter === 'redux') {
      const { ReduxAdapter } = await import('./ReduxAdapter');
      return new ReduxAdapter();
    } else {
      const { MemoryAdapter } = await import('./MemoryAdapter');
      return new MemoryAdapter();
    }
  } catch (error) {
    console.error(`❌ Error al cargar el adaptador "${adapter}", usando Redux como fallback`, error);
    const { ReduxAdapter } = await import('./ReduxAdapter'); // Fallback a Redux
    return new ReduxAdapter();
  }
};

// 🔹 Obtener tipo de adaptador desde configuración (con fallback a 'redux')
const adapterType = Config.get<'redux' | 'memory'>('EXPO_PUBLIC_STATE_ADAPTER') ?? 'memory';

// 🔹 Función principal para obtener el adaptador de estado
export const getStateAdapter = async (): Promise<IStateAdapter<RootState>> => {
  return await loadAdapter(adapterType);
};
