// src/core/hooks/useDebounce.ts
import { useEffect, useState } from 'react';

/**
 * Hook para aplicar debounce a un valor.
 * @param value El valor que se desea "debounced".
 * @param delay Tiempo de retardo en milisegundos.
 * @returns El valor actualizado después del retardo.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpia el timeout si el valor o delay cambian
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
