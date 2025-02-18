// src/presentation/navigation/stacks/MainStack.tsx
import React, { Suspense } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View } from 'react-native';

// Carga diferida de la pantalla principal
const HomeScreen = React.lazy(
  () => import('@presentation/features/home/view/HomeScreen'),
);

const Stack = createStackNavigator();

export default function MainStack() {
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
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </Suspense>
  );
}
