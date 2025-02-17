// src/core/state/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { getStateAdapter } from '../adapters';
import { IAppState } from '../interfaces/IAppState';

export const useAuth = () => {
  const [stateAdapter, setStateAdapter] = useState<any>(null);
  const [user, setUserState] = useState<string>('');

  // Cargar el adaptador de estado de forma asíncrona
  useEffect(() => {
    getStateAdapter().then((adapter) => {
      setStateAdapter(adapter);
      setUserState(adapter.getState().auth.user);
    });
  }, []);

  // Obtener usuario
  const getUser = () => {
    return stateAdapter ? stateAdapter.getState().auth.user : user;
  };

  // Establecer usuario
  const setUser = (user: string) => {
    if (stateAdapter) {
      const currentState: IAppState = stateAdapter.getState();
      stateAdapter.setState({
        auth: {
          ...currentState.auth,
          user,
        },
      });
      setUserState(user);
    }
  };

  return { getUser, setUser };
};
