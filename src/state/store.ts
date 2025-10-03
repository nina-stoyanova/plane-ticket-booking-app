import { configureStore } from '@reduxjs/toolkit';
import bookingsUiReducer from '@/state/bookingsUi.slice';

export const store = configureStore({
  reducer: {
    bookingsUi: bookingsUiReducer,  
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
