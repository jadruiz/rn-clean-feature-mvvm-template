// src/presentation/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './NavigationService';
import TabNavigator from './stacks/TabNavigator';

export default function AppNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <TabNavigator />
    </NavigationContainer>
  );
}
