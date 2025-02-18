// src/common/helpers/performanceHelpers.ts

/**
 * Retorna una versión debounced de la función dada, que se ejecutará
 * solo después de que transcurra un retraso especificado sin nuevas invocaciones.
 *
 * @param func La función que se quiere debounced.
 * @param delay El retraso en milisegundos (por defecto 300ms).
 * @returns Una función debounced.
 */
export const debounce = (func: (...args: any[]) => void, delay = 300) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};
