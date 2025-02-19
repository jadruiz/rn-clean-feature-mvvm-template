// src/presentation/features/auth/viewModel/LoginViewModel.ts

import { useState } from 'react';
import { AuthService } from '@core/auth/AuthService';
import { AuthenticationError } from '@core/errors/AuthenticationError';
import { User } from '@domain/entities/User';

export const useLoginViewModel = (authService: AuthService) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const login = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const loggedUser = await authService.login(username, password);
      setUser(loggedUser);
    } catch (e: any) {
      if (e instanceof AuthenticationError) {
        setError(e.message);
      } else {
        setError('Error inesperado. Inténtalo de nuevo.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    isLoading,
    error,
    login,
    user,
  };
};
