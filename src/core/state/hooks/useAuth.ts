// src/core/state/hooks/useAuth.ts
import { StateAdapter } from '../StateAdapter';

export const useAuth = () => {
  const getUser = () => StateAdapter.getState().auth.user;

  const setUser = (user: string) => {
    const currentState = StateAdapter.getState();
    StateAdapter.setState({
      ...currentState,
      auth: {
        ...currentState.auth,
        user,
      },
    });
  };

  return { getUser, setUser };
};
