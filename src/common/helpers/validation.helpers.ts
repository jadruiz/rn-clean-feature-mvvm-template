// src/core/utils/validation/inputValidators.ts

/**
 * Valida si un email tiene un formato correcto.
 * @param email Email a validar.
 * @returns True si el formato es válido, false de lo contrario.
 */
export const isEmailValid = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Valida si una contraseña cumple con criterios mínimos (por ejemplo, longitud mínima).
 * @param password Contraseña a validar.
 * @returns True si la contraseña es suficientemente fuerte, false de lo contrario.
 */
export const isPasswordStrong = (password: string): boolean => {
  return password.length >= 8;
};
