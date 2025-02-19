// src/core/state/adapters/MemoryAdapter.ts
import { injectable } from 'tsyringe';
import { IStateAdapter } from '../interfaces/IStateAdapter';
import { IAppState } from '../interfaces/IAppState';

// Estado inicial en memoria
let memoryState: IAppState = {
  auth: { user: '', token: '' },
};

@injectable()
export class MemoryAdapter implements IStateAdapter<IAppState> {
  private listeners: Array<(state: IAppState) => void> = [];

  getState(): IAppState {
    return memoryState;
  }

  setState(state: Partial<IAppState>): void {
    memoryState = { ...memoryState, ...state };
    this.listeners.forEach((listener) => listener(memoryState));
  }

  subscribe(listener: (state: IAppState) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
}
