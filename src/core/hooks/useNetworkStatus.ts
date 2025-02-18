// src/core/hooks/useNetworkStatus.ts
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { NetworkManager } from '@infrastructure/network/NetworkManager';
import { NetInfoState } from '@react-native-community/netinfo';

export const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [connectionType, setConnectionType] = useState<string>('unknown');

  useEffect(() => {
    // Verificar conexión inicial
    NetworkManager.isOnline().then((connected: boolean) => {
      setIsConnected(connected);
    });
    NetworkManager.getConnectionType().then((type: string) => {
      setConnectionType(type);
    });

    // Suscribirse a cambios en la conectividad
    const unsubscribe = NetworkManager.subscribe((state: NetInfoState) => {
      setIsConnected(state.isConnected !== null ? state.isConnected : false);
      setConnectionType(state.type);
      if (!state.isConnected) {
        Alert.alert(
          '⚠️ Conexión perdida',
          'Parece que perdiste la conexión a Internet. Algunas funciones pueden no estar disponibles.'
        );
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { isConnected, connectionType };
};
