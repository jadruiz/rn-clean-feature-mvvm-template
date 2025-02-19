// src/core/auth/AuthProvider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@domain/entities/User';
import { AuthService } from '@core/auth/AuthService';
import { SQLiteAuthRepository } from '@infrastructure/data/repositories/SQLiteAuthRepository';
import { SessionManager } from '@core/auth/SessionManager';

// Define la interfaz del contexto de autenticación
interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Crea el contexto con valores por defecto
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: async () => {},
});

// Hook para acceder al contexto de autenticación
export const useAuthContext = () => useContext(AuthContext);

// Componente Provider que gestiona el estado de autenticación
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Instancia del repositorio y servicio de autenticación
  const authRepository = new SQLiteAuthRepository();
  const authService = new AuthService(authRepository);

  // Función para iniciar sesión
  const login = async (username: string, password: string) => {
    const loggedUser = await authService.login(username, password);
    setUser(loggedUser);
  };

  // Función para cerrar sesión
  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  // Al montar el proveedor, se intenta cargar el usuario persistido (si existe)
  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await authRepository.getUser();
      if (storedUser) {
        setUser(storedUser);
        SessionManager.startSession(storedUser);
      }
    };
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
