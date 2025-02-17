// src/core/a11y/DynamicFontSize.ts
import { PixelRatio } from 'react-native';

/**
 * Ajusta el tamaño de fuente basándose en las preferencias del usuario.
 * Este es un ejemplo sencillo que escala el tamaño de texto en función de la densidad de píxeles.
 */
export class DynamicFontSize {
  /**
   * Escala el tamaño de fuente base según la densidad de píxeles.
   * @param baseFontSize Tamaño de fuente base en puntos (pt).
   */
  static scaleFont(baseFontSize: number): number {
    // Ajuste simple usando PixelRatio.
    // Puedes añadir más lógica para adaptarse a configuraciones de accesibilidad.
    const scale = PixelRatio.getFontScale();
    return baseFontSize * scale;
  }
}
