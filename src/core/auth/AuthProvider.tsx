// src/core/auth/AuthProvider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@domain/entities/User';
import { NetworkObserver } from '@infrastructure/network/NetworkObserver';
import { OfflineAuthSync } from './OfflineAuthSync';
import { AuthRepository } from '@infrastructure/data/repositories/AuthRepository';

interface AuthContextData {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Definimos una interfaz para las props del AuthProvider
interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Instanciar el repositorio y el OfflineAuthSync
  const authRepository = new AuthRepository();
  const offlineAuthSync = new OfflineAuthSync(authRepository);
  const networkObserver = new NetworkObserver();

  // Suscribirse a cambios de conectividad para sincronizar autenticación
  useEffect(() => {
    const unsubscribe = networkObserver.subscribe((isOnline: boolean) => {
      if (isOnline) {
        offlineAuthSync.syncPendingOperations().catch((error) => {
          console.error('Error sincronizando autenticación offline:', error);
        });
      }
    });
    return () => unsubscribe();
  }, [networkObserver, offlineAuthSync]);

  const login = async (username: string, password: string) => {
    // Aquí se debería llamar a AuthService.login en una implementación real.
    // Para simplificar, asignamos un usuario dummy y se podría agregar la operación pendiente.
    const dummyUser: User = {
      id: 'user123',
      username,
      token: 'dummy-token',
      timestamp: Date.now(),
    };
    setUser(dummyUser);
    // Aquí podrías persistir la operación de login para sincronización offline:
    // await LocalAuthStorage.enqueueOperation({ type: 'LOGIN', payload: dummyUser, timestamp: Date.now() });
  };

  const logout = async () => {
    setUser(null);
    // Aquí también podrías limpiar datos persistidos si es necesario.
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
