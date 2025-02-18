// src/core/utils/dateUtils/dateCalculations.ts

/**
 * Calcula el número de días entre dos fechas.
 * @param startDate Fecha de inicio.
 * @param endDate Fecha de finalización.
 * @returns Número de días entre startDate y endDate.
 */
export const daysBetween = (startDate: Date, endDate: Date): number => {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.floor((endDate.getTime() - startDate.getTime()) / msPerDay);
};
