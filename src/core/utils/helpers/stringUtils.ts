// src/core/utils/helpers/stringUtils.ts

/**
 * Capitaliza la primera letra de una cadena.
 * @param str Cadena de texto.
 * @returns Cadena con la primera letra en mayúsculas.
 */
export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Convierte una cadena a camelCase.
 * @param str Cadena de texto.
 * @returns Cadena en formato camelCase.
 */
export const toCamelCase = (str: string): string =>
  str
    .toLowerCase()
    .split(/[\s-_]+/)
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join('');
