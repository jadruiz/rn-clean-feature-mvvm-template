// src/core/state/redux/store.ts
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAppState } from '../interfaces/IAppState';

// Estado inicial
const initialState: IAppState = {
  auth: {
    user: '',
    token: '',
  },
};

// Slice de Redux
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<Partial<IAppState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setState } = appSlice.actions;

// Crear el store
export const store = configureStore({
  reducer: appSlice.reducer,
});

// Definir RootState basado en el store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
