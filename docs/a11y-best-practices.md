# Accesibilidad (a11y)

La accesibilidad es un aspecto fundamental en el desarrollo de aplicaciones inclusivas. Este documento describe las abstracciones y buenas prácticas implementadas en este template para mejorar la experiencia de usuarios con discapacidad, garantizando que la aplicación sea usable por todos.

---

## Tabla de Contenidos

- [Introducción](#introducci%C3%B3n)
- [Objetivos de la Accesibilidad](#objetivos-de-la-accesibilidad)
- [Estructura y Ubicación](#estructura-y-ubicaci%C3%B3n)
- [Componentes y Servicios de Accesibilidad](#componentes-y-servicios-de-accesibilidad)
  - [AccessibilityHelper](#accessibilityhelper)
  - [DynamicFontSize](#dynamicfontsize)
  - [FocusManager](#focusmanager)
  - [HighContrastMode](#highcontrastmode)
  - [ScreenReaderService](#screenreaderservice)
  - [A11yContext](#a11ycontext)
- [Buenas Prácticas](#buenas-pr%C3%A1cticas)
- [Ejemplos de Uso](#ejemplos-de-uso)
- [Consideraciones Adicionales](#consideraciones-adicionales)

---

## Introducción

El objetivo de este template es facilitar la implementación de **accesibilidad** en aplicaciones React Native. Se han creado varias abstracciones y servicios que ayudan a:

- **Notificar** cambios al lector de pantalla.
- **Ajustar** dinámicamente el tamaño de las fuentes según las preferencias del usuario.
- **Gestionar** el enfoque (focus) en la interfaz.
- **Detectar** y responder a configuraciones de alto contraste.

Estas herramientas permiten que los desarrolladores se concentren en la lógica de negocio y la experiencia de usuario, mientras se cumplen las pautas de accesibilidad.

---

## Objetivos de la Accesibilidad

- **Inclusión:** Asegurar que todos los usuarios, independientemente de sus capacidades, puedan interactuar con la aplicación.
- **Claridad:** Proporcionar mensajes claros y legibles mediante el uso de lectores de pantalla.
- **Interacción:** Facilitar la navegación a través del teclado y otros dispositivos de asistencia.
- **Consistencia:** Mantener un comportamiento uniforme en todos los componentes, permitiendo un ajuste centralizado en caso de cambios.

---

## Estructura y Ubicación

La lógica relacionada con la accesibilidad se encuentra en la carpeta `src/core/a11y/` y se organiza en varios archivos, cada uno con una responsabilidad específica:

- **AccessibilityHelper.ts:** Funciones generales para interactuar con la API de accesibilidad.
- **DynamicFontSize.ts:** Ajuste dinámico del tamaño de fuente.
- **FocusManager.ts:** Gestión del enfoque (focus) en elementos específicos.
- **HighContrastMode.ts:** Detección y manejo del modo de alto contraste.
- **ScreenReaderService.ts:** Interacción con el lector de pantalla para anunciar mensajes.
- **A11yContext.tsx:** Contexto de React para compartir configuraciones de accesibilidad a lo largo de la aplicación.

---

## Componentes y Servicios de Accesibilidad

### AccessibilityHelper

Centraliza funciones genéricas relacionadas con accesibilidad, como anunciar mensajes o verificar si el lector de pantalla está activo.

```ts
// src/core/a11y/AccessibilityHelper.ts
import { AccessibilityInfo } from 'react-native';

export class AccessibilityHelper {
  static announceForAccessibility(message: string): void {
    AccessibilityInfo.announceForAccessibility(message);
  }

  static async isScreenReaderEnabled(): Promise<boolean> {
    return await AccessibilityInfo.isScreenReaderEnabled();
  }
}
```

### DynamicFontSize

Ajusta el tamaño de fuente según las preferencias de accesibilidad del usuario.

```ts
// src/core/a11y/DynamicFontSize.ts
import { PixelRatio } from 'react-native';

export class DynamicFontSize {
  static scaleFont(baseFontSize: number): number {
    const scale = PixelRatio.getFontScale();
    return baseFontSize * scale;
  }
}
```

### FocusManager

Gestiona el enfoque de accesibilidad en elementos específicos.

```ts
// src/core/a11y/FocusManager.ts
import { findNodeHandle, AccessibilityInfo } from 'react-native';

export class FocusManager {
  static focusOn(ref: any): void {
    const node = findNodeHandle(ref.current || ref);
    if (node) {
      AccessibilityInfo.setAccessibilityFocus(node);
    }
  }
}
```

### HighContrastMode

Determina si el usuario está utilizando un modo de alto contraste y permite ajustar la interfaz en consecuencia.

```ts
// src/core/a11y/HighContrastMode.ts
import { Appearance } from 'react-native';

export class HighContrastMode {
  static isHighContrast(): boolean {
    const colorScheme = Appearance.getColorScheme();
    return colorScheme === 'dark';
  }
}
```

### ScreenReaderService

Facilita la interacción con el lector de pantalla.

```ts
// src/core/a11y/ScreenReaderService.ts
import { AccessibilityInfo } from 'react-native';

export class ScreenReaderService {
  static announce(message: string): void {
    AccessibilityInfo.announceForAccessibility(message);
  }

  static async isEnabled(): Promise<boolean> {
    return await AccessibilityInfo.isScreenReaderEnabled();
  }
}
```

### A11yContext

Provee un contexto de React para compartir información de accesibilidad.

```tsx
// src/core/a11y/A11yContext.tsx
import React, { createContext, useContext, useState, useEffect, PropsWithChildren } from 'react';
import { AccessibilityInfo } from 'react-native';
import { Logger, consoleAdapter, LogLevel } from '@core/logging';

const logger = new Logger(consoleAdapter, LogLevel.INFO);

export interface A11yContextProps {
  screenReaderEnabled: boolean;
  setScreenReaderEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const A11yContext = createContext<A11yContextProps | undefined>(undefined);

export const A11yProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [screenReaderEnabled, setScreenReaderEnabled] = useState<boolean>(false);

  useEffect(() => {
    const checkScreenReader = async () => {
      try {
        const enabled = await AccessibilityInfo.isScreenReaderEnabled();
        setScreenReaderEnabled(enabled);
        logger.info('Screen reader enabled status', { enabled });
      } catch (error) {
        logger.error('Error checking screen reader status', error);
      }
    };

    checkScreenReader();

    const subscription = AccessibilityInfo.addEventListener('change', (isEnabled) => {
      try {
        setScreenReaderEnabled(isEnabled);
        logger.info('Screen reader changed', { isEnabled });
      } catch (error) {
        logger.error('Error handling screen reader change event', error);
      }
    });

    return () => {
      try {
        subscription?.remove?.();
      } catch (error) {
        logger.error('Error removing screen reader event listener', error);
      }
    };
  }, []);

  return (
    <A11yContext.Provider value={{ screenReaderEnabled, setScreenReaderEnabled }}>
      {children}
    </A11yContext.Provider>
  );
};

export const useA11yContext = (): A11yContextProps => {
  const context = useContext(A11yContext);
  if (!context) {
    const errorMsg = 'useA11yContext must be used within an A11yProvider';
    logger.error(errorMsg);
    throw new Error(errorMsg);
  }
  return context;
};
```

---

## Buenas Prácticas

- Mantén toda la lógica de accesibilidad en `src/core/a11y/`.
- Utiliza `A11yContext` para compartir información global sobre accesibilidad.
- Permite ajustes dinámicos para mejorar la experiencia del usuario.
- Integra accesibilidad con logging y telemetría para seguimiento de eventos críticos.

---

## Consideraciones Adicionales

- **Pruebas de accesibilidad:** Usa VoiceOver (iOS) y TalkBack (Android) para verificar el comportamiento de la app.
- **Feedback del usuario:** Implementa mecanismos para recibir reportes de problemas de accesibilidad.

Con estas herramientas y mejores prácticas, este template proporciona una base sólida para desarrollar aplicaciones accesibles en React Native. 🚀
