// src/presentation/navigation/stacks/MainStack.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// Importa las pantallas principales de tu aplicación
import HomeScreen from '@presentation/features/home/view/HomeScreen';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
