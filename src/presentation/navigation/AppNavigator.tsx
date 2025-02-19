// src/presentation/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuthContext } from '@core/auth/AuthProvider';
import LoginScreen from '@presentation/features/auth/view/LoginScreen';
import HomeScreen from '@presentation/features/home/view/HomeScreen';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  const { user } = useAuthContext();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          // Si hay usuario autenticado, muestra la pantalla principal
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          // Si no hay usuario, muestra la pantalla de login
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
