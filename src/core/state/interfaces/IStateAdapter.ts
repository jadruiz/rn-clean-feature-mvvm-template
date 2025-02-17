// src/core/state/interfaces/IStateAdapter.ts
export interface IStateAdapter<T> {
  getState: () => T;
  setState: (state: Partial<T>) => void;
  subscribe: (listener: (state: T) => void) => () => void;
}
