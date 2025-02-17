// src/core/a11y/AccessibilityHelper.ts
import { AccessibilityInfo } from 'react-native';

/**
 * Funciones de ayuda genéricas relacionadas con la accesibilidad.
 */
export class AccessibilityHelper {
  /**
   * Anuncia un mensaje al lector de pantalla.
   */
  static announceForAccessibility(message: string): void {
    AccessibilityInfo.announceForAccessibility(message);
  }

  /**
   * Verifica si el lector de pantalla está activo.
   */
  static async isScreenReaderEnabled(): Promise<boolean> {
    return await AccessibilityInfo.isScreenReaderEnabled();
  }
}
