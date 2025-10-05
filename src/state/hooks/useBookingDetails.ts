import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/state/store";
import {
  selectSelectedBookingDetails,
  selectSelectedBookingId,
  setBookingDetails,
  setSelectedBookingId,
} from "@/state/bookingsSlice";
import { API } from "@/api/api";

export function useBookingDetails() {
  const dispatch = useDispatch();

  const [detailsOpen, setDetailsOpen] = useState(false);

  const selectedBookingId = useSelector((s: RootState) =>
    selectSelectedBookingId(s)
  );
  const selectedBookingDetails = useSelector((s: RootState) =>
    selectSelectedBookingDetails(s)
  );

  const openWithId = useCallback(
    (id: number) => {
      setDetailsOpen(true);
      dispatch(setSelectedBookingId(id));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!selectedBookingId) return;
    (async () => {
      try {
        const bookingDetails = await API.Bookings.getById(selectedBookingId);
        dispatch(setBookingDetails(bookingDetails));
      } catch (err) {
        console.error("Fetch booking details failed:", err);
      }
    })();
  }, [dispatch, selectedBookingId]);

  return {
    selectedBookingDetails,
    detailsOpen,
    setDetailsOpen,
    openWithId,
  };
}
