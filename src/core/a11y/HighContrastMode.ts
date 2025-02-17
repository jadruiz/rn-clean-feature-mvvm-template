// src/core/a11y/HighContrastMode.ts
import { Appearance } from 'react-native';

export class HighContrastMode {
  /**
   * Determina si el usuario está usando modo de alto contraste.
   * En iOS/Android puro no hay un API estándar para alto contraste.
   * Como alternativa, podrías usar un tema "High Contrast" si el sistema está en modo oscuro.
   */
  static isHighContrast(): boolean {
    const colorScheme = Appearance.getColorScheme();
    // Por ejemplo, consideramos "dark" como "high contrast" de manera simplificada
    return colorScheme === 'dark';
  }
}
