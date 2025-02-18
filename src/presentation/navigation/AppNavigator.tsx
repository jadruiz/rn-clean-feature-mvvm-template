// src/presentation/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './NavigationService';
import AuthStack from './stacks/AuthStack';
import MainStack from './stacks/MainStack';

export default function AppNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      {/* Se puede optar por lógica condicional para mostrar distintos stacks,
          por ejemplo, si el usuario está autenticado o no */}
      {/* Ejemplo: */}
      {/* {isLoggedIn ? <MainStack /> : <AuthStack />} */}

      {/* Para este ejemplo, se usa un Stack raíz que permite navegar entre ambos stacks */}
      {/* Opcional: se puede utilizar un Stack principal para definir rutas raíz */}
      <>
        <AuthStack />
        <MainStack />
      </>
    </NavigationContainer>
  );
}
