// src/core/state/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: string;
  token?: string;
}

const initialState: AuthState = {
  user: '',
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: string; token?: string }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = '';
      state.token = '';
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
