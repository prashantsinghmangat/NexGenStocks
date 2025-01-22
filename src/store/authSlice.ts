import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User, LoginCredentials, SignupCredentials } from '../types/auth';

const getStoredUser = (): User | null => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
};

const initialState: AuthState = {
  user: getStoredUser(),
  isAuthenticated: !!getStoredUser(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginCredentials>) => {
      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: action.payload.email,
        username: action.payload.email.split('@')[0],
        createdAt: new Date().toISOString(),
      };
      state.user = user;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(user));
    },
    signup: (state, action: PayloadAction<SignupCredentials>) => {
      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: action.payload.email,
        username: action.payload.username,
        createdAt: new Date().toISOString(),
      };
      state.user = user;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(user));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
  },
});

export const { login, signup, logout } = authSlice.actions;
export default authSlice.reducer;