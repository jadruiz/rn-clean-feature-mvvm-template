// src/core/state/StateAdapter.ts
import { ReduxAdapter } from './adapters/ReduxAdapter';
import { IStateAdapter } from './interfaces/IStateAdapter';
import { RootState } from './redux/store';

// Se inicializa la abstracción de estado con ReduxAdapter
export const StateAdapter: IStateAdapter<RootState> = new ReduxAdapter();
