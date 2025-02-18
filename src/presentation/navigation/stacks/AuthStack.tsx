// src/presentation/navigation/stacks/AuthStack.tsx
import React, { Suspense } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View } from 'react-native';

// Carga diferida de las pantallas de autenticación
const LoginScreen = React.lazy(
  () => import('@presentation/features/auth/view/LoginScreen'),
);
const RegisterScreen = React.lazy(
  () => import('@presentation/features/auth/view/RegisterScreen'),
);

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Suspense
      fallback={
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      }
    >
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </Suspense>
  );
}
