import { configureStore } from "@reduxjs/toolkit";
import bookingsSlice from "@/state/bookingsSlice";

export const store = configureStore({
  reducer: {
    bookings: bookingsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
