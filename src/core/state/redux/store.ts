// src/core/state/redux/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import { telemetryMiddleware } from '../middlewares/TelemetryMiddleware';
import { Config } from '@core/config/environment/EnvConfig';

// Combinar múltiples reducers
const rootReducer = combineReducers({
  auth: authReducer,
});

// Configuración del store
export const store = configureStore({
  reducer: rootReducer,
  devTools: Config.get<string>('ENV') !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(telemetryMiddleware),
});

// Tipos derivados del store
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
