import { useDispatch, useSelector } from "react-redux";
import BookingCard from "./components/bookings/BookingCard";
import BookingForm, {
  type BookingFormValues,
} from "./components/bookings/BookingForm";
import BookingList from "./components/bookings/BookingList";
import type { RootState } from "./state/store";
import {
  addBooking,
  removeBooking,
  selectAirports,
  selectBookings,
  setAirports,
  setBookings,
} from "./state/bookingsSlice";
import { useCallback, useEffect } from "react";
import { API } from "./api/api";

export default function App() {
  const dispatch = useDispatch();

  const airports = useSelector((s: RootState) => selectAirports(s));
  const bookings = useSelector((s: RootState) => selectBookings(s));
  console.log("airports store", airports);
  console.log("bookings store", bookings);

  useEffect(() => {
    (async () => {
      try {
        const airports = await API.Airports.list();
        dispatch(setAirports(airports));

        const bookings = await API.Bookings.list(0, 10);
        dispatch(setBookings(bookings));
      } catch (err) {
        console.error("API Error Details:", err);
      }
    })();
  }, [dispatch]);

  const handleCreate = useCallback(
    async (values: BookingFormValues) => {
      try {
        const created = await API.Bookings.create(values);

        dispatch(
          addBooking({
            id: created.id,
            firstName: created.firstName,
            lastName: created.lastName,
            departureDate: created.departureDate,
            returnDate: created.returnDate,
          })
        );
      } catch (err) {
        console.error("Create booking failed:", err);
        alert("Failed to create booking");
      }
    },
    [dispatch]
  );

  const handleDelete = useCallback(
    async (id: number) => {
      try {
        await API.Bookings.remove(id);
        dispatch(removeBooking(id));
      } catch (err) {
        console.error("Delete booking failed:", err);
        alert("Failed to delete booking");
      }
    },
    [dispatch]
  );

  const airportOptions = airports.map((a) => ({
    value: a.id,
    label: `${a.code} — ${a.title}`,
  }));

  const listItems = bookings.map((b) => ({
    id: b.id,
    firstName: b.firstName,
    lastName: b.lastName,
    departureDate: b.departureDate,
    returnDate: b.returnDate,
  }));

  return (
    <div className="page">
      <div className="container">
        <h1 className="title">Booking app</h1>

        <BookingCard>
          <BookingForm airports={airportOptions} onCreate={handleCreate} />
        </BookingCard>

        <BookingCard>
          <BookingList items={listItems} onDelete={handleDelete} />
        </BookingCard>
      </div>
    </div>
  );
}
