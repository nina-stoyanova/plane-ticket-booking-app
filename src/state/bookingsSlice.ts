import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export type Airport = { id: number; code: string; title: string };
export type BookingItem = {
  id: number;
  firstName: string;
  lastName: string;
  departureDate: string;
  returnDate: string;
};

type BookingDataState = {
  airports: Airport[];
  bookings: BookingItem[];
  totalCount: number;
  detailsById?: Record<number, BookingItem>;
};

const initialState: BookingDataState = {
  airports: [],
  bookings: [],
  totalCount: 0,
  detailsById: {},
};

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setAirports(state, action: PayloadAction<Airport[]>) {
      state.airports = action.payload;
    },
    setBookings(
      state,
      action: PayloadAction<{ list: BookingItem[]; totalCount: number }>
    ) {
      state.bookings = action.payload.list;
      state.totalCount = action.payload.totalCount;
    },

    appendBookings(state, action: PayloadAction<BookingItem[]>) {
      const seen = new Set(state.bookings.map((b) => b.id));
      for (const b of action.payload)
        if (!seen.has(b.id)) state.bookings.push(b);
    },
    addBooking(state, action: PayloadAction<BookingItem>) {
      state.bookings.unshift(action.payload);
      state.totalCount += 1;
    },
    removeBooking(state, action: PayloadAction<number>) {
      state.bookings = state.bookings.filter((b) => b.id !== action.payload);
      state.totalCount = Math.max(0, state.totalCount - 1);
    },
    clearAll(state) {
      state.airports = [];
      state.bookings = [];
      state.totalCount = 0;
      state.detailsById = {};
    },

    setBookingDetail(state, action: PayloadAction<BookingItem>) {
      state.detailsById![action.payload.id] = action.payload;
    },
  },
});

export const {
  setAirports,
  setBookings,
  appendBookings,
  addBooking,
  removeBooking,
  clearAll,
  setBookingDetail,
} = bookingsSlice.actions;

export default bookingsSlice.reducer;

export const selectAirports = (s: RootState) => s.bookings.airports;
export const selectBookings = (s: RootState) => s.bookings.bookings;
export const selectTotalCount = (s: RootState) => s.bookings.totalCount;
export const selectDetailById = (id: number) => (s: RootState) =>
  s.bookings.detailsById?.[id];
export const selectHasMoreBookingToLoad = (s: RootState) => {
  return s.bookings.totalCount > s.bookings.bookings.length;
};
