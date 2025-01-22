import { configureStore } from '@reduxjs/toolkit';
import stockReducer from './stockSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    stocks: stockReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;