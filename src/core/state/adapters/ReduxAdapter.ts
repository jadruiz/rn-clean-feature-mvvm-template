// src/core/state/adapters/ReduxAdapter.ts
import { injectable } from 'tsyringe';
import { store } from '../redux/store';
import { IStateAdapter } from '../interfaces/IStateAdapter';
import { RootState } from '../redux/store';

@injectable()
export class ReduxAdapter implements IStateAdapter<RootState> {
  getState(): RootState {
    return store.getState();
  }

  setState(state: Partial<RootState>) {
    store.dispatch({ type: 'SET_STATE', payload: state });
  }

  subscribe(listener: (state: RootState) => void) {
    const unsubscribe = store.subscribe(() => listener(store.getState()));
    return unsubscribe;
  }
}
