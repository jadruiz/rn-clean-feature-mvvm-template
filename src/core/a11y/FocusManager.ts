// src/core/a11y/FocusManager.ts
import { findNodeHandle, AccessibilityInfo } from 'react-native';

export class FocusManager {
  static focusOn(ref: any): void {
    // ref puede ser useRef() o una ref de clase
    const node = findNodeHandle(ref.current || ref);
    if (node) {
      // iOS / Android: Mueve el foco de accesibilidad a la vista
      AccessibilityInfo.setAccessibilityFocus(node);
    }
  }
}
