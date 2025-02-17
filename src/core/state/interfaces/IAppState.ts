// src/core/state/interfaces/IAppState.ts
export interface IAppState {
  auth: {
    user: string;
    token?: string;
  };
}
