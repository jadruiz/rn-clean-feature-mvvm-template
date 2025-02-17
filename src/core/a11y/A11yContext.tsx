// src/core/a11y/A11yContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from 'react';
import { AccessibilityInfo } from 'react-native';
import { Logger, consoleAdapter, LogLevel } from '@core/logging';

const logger = new Logger(consoleAdapter, LogLevel.INFO);

export interface A11yContextProps {
  screenReaderEnabled: boolean;
  setScreenReaderEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const A11yContext = createContext<A11yContextProps | undefined>(undefined);

export const A11yProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [screenReaderEnabled, setScreenReaderEnabled] =
    useState<boolean>(false);

  useEffect(() => {
    // Función para verificar el estado del lector de pantalla
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

    // Suscribirse a cambios en el lector de pantalla
    const subscription = AccessibilityInfo.addEventListener(
      'change',
      (isEnabled) => {
        try {
          setScreenReaderEnabled(isEnabled);
          logger.info('Screen reader changed', { isEnabled });
        } catch (error) {
          logger.error('Error handling screen reader change event', error);
        }
      },
    );

    // Limpieza de la suscripción
    return () => {
      try {
        subscription?.remove?.();
      } catch (error) {
        logger.error('Error removing screen reader event listener', error);
      }
    };
  }, []);

  return (
    <A11yContext.Provider
      value={{ screenReaderEnabled, setScreenReaderEnabled }}
    >
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
