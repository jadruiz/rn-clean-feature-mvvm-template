// src/presentation/navigation/NavigationService.ts
import React from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

export const navigationRef = React.createRef<NavigationContainerRef<any>>();

export function navigate(name: string, params?: object): void {
  navigationRef.current?.navigate(name, params);
}
