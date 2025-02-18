// src/core/utils/dateUtils/formatDate.ts

/**
 * Formatea una fecha a un formato legible basado en la localización.
 * Permite incluir la hora y opciones personalizadas.
 *
 * @param date Fecha a formatear (Date, string o timestamp).
 * @param locale Localización (por defecto: 'en-US').
 * @param options Opciones adicionales para formateo (por ejemplo, includeTime).
 * @returns Fecha formateada como cadena.
 * @throws Error si la fecha es inválida.
 */
export const formatDate = (
  date: Date | string | number,
  locale: string = 'en-US',
  options?: Intl.DateTimeFormatOptions & { includeTime?: boolean },
): string => {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    throw new Error('Fecha inválida proporcionada a formatDate');
  }

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  if (options?.includeTime) {
    defaultOptions.hour = '2-digit';
    defaultOptions.minute = '2-digit';
    defaultOptions.second = '2-digit';
  }

  const finalOptions = { ...defaultOptions, ...options };

  return new Intl.DateTimeFormat(locale, finalOptions).format(parsedDate);
};
