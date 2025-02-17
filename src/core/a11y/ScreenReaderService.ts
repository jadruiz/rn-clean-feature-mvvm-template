// src/core/a11y/ScreenReaderService.ts
import { AccessibilityInfo } from 'react-native';

export class ScreenReaderService {
  /**
   * Anuncia un mensaje al lector de pantalla.
   */
  static announce(message: string): void {
    AccessibilityInfo.announceForAccessibility(message);
  }

  /**
   * Verifica si el lector de pantalla está activo.
   */
  static async isEnabled(): Promise<boolean> {
    return await AccessibilityInfo.isScreenReaderEnabled();
  }
}
