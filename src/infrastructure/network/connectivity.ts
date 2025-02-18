// src/core/utils/network/connectivity.ts

/**
 * Verifica si el dispositivo está conectado a Internet.
 * @returns True si el dispositivo está en línea, false en caso contrario.
 */
export const isOnline = (): boolean => {
  return typeof navigator !== 'undefined' && navigator.onLine !== undefined
    ? navigator.onLine
    : true;
};
