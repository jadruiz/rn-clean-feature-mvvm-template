// src/presentation/navigation/stacks/SettingsStack.tsx
import React, { Suspense } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View } from 'react-native';

// Carga diferida de la pantalla de Settings
const SettingsScreen = React.lazy(
  () => import('@presentation/features/settings/view/SettingsScreen')
);

const Stack = createStackNavigator();

export default function SettingsStack() {
  return (
    <Suspense
      fallback={
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      }
    >
      <Stack.Navigator initialRouteName="SettingsHome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SettingsHome" component={SettingsScreen} />
      </Stack.Navigator>
    </Suspense>
  );
}
