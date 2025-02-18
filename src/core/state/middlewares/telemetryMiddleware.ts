// src/core/state/middlewares/telemetryMiddleware.ts
import { Middleware } from '@reduxjs/toolkit';
import { Action } from 'redux';
import TelemetryService from '@core/telemetry/TelemetryService';

export const telemetryMiddleware: Middleware =
  (store) => (next) => (action: unknown) => {
    if ((action as Action).type) {
      TelemetryService.getInstance().logEvent('ReduxAction', {
        action: (action as Action).type,
      });
    }
    return next(action);
  };
