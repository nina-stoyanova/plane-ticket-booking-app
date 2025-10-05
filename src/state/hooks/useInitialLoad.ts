import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API } from "../../api/api";
import { setAirports, setBookings } from "../bookingsSlice";

export function useInitialLoad() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const airports = await API.Airports.list();
        dispatch(setAirports(airports));

        const firstPageBookings = await API.Bookings.list(0, 5);
        dispatch(setBookings(firstPageBookings));
      } catch (err) {
        console.error("API Error Details:", err);
      }
    })();
  }, [dispatch]);
}
