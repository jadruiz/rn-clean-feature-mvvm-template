// src/core/a11y/A11yContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AccessibilityInfo } from 'react-native';

interface A11yContextProps {
  screenReaderEnabled: boolean;
  setScreenReaderEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const A11yContext = createContext<A11yContextProps | undefined>(undefined);

interface A11yProviderProps {
  children: React.ReactNode;
}

export const A11yProvider: React.FC<A11yProviderProps> = ({ children }) => {
  const [screenReaderEnabled, setScreenReaderEnabled] = useState(false);

  useEffect(() => {
    const checkScreenReader = async () => {
      const enabled = await AccessibilityInfo.isScreenReaderEnabled();
      setScreenReaderEnabled(enabled);
    };
    checkScreenReader();

    // Suscribirse a cambios en el lector de pantalla
    const subscription = AccessibilityInfo.addEventListener(
      'change',
      (isEnabled) => {
        setScreenReaderEnabled(isEnabled);
      },
    );

    return () => {
      subscription?.remove?.();
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

// Hook para acceder al contexto
export const useA11yContext = (): A11yContextProps => {
  const context = useContext(A11yContext);
  if (!context) {
    throw new Error('useA11yContext must be used within an A11yProvider');
  }
  return context;
};
