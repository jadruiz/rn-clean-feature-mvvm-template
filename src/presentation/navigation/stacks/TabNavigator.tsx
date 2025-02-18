// src/presentation/navigation/TabNavigator.tsx
import React, { Suspense } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, View } from 'react-native';

// Carga diferida de los stacks
const MainStack = React.lazy(() => import('../stacks/MainStack'));
const SettingsStack = React.lazy(() => import('../stacks/SettingsStack'));

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Suspense
      fallback={
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      }
    >
      <Tab.Navigator initialRouteName="Main">
        <Tab.Screen name="Main" component={MainStack} />
        <Tab.Screen name="Settings" component={SettingsStack} />
      </Tab.Navigator>
    </Suspense>
  );
}
