import { useDispatch, useSelector } from "react-redux";
import BookingCard from "./components/bookings/BookingCard";
import BookingForm, {
  type BookingFormValues,
} from "./components/bookings/BookingForm";
import BookingList from "./components/bookings/BookingList";
import type { RootState } from "./state/store";
import {
  addBooking,
  appendBookings,
  removeBooking,
  selectAirports,
  selectBookings,
  selectHasMoreBookingToLoad,
  setAirports,
  setBookings,
} from "./state/bookingsSlice";
import { useCallback, useEffect, useState } from "react";
import { API } from "./api/api";

export default function App() {
  const dispatch = useDispatch();

  const airports = useSelector((s: RootState) => selectAirports(s));
  const bookings = useSelector((s: RootState) => selectBookings(s));

  const hasMore = useSelector((s: RootState) => selectHasMoreBookingToLoad(s));
  const [page, setPage] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const airports = await API.Airports.list();
        dispatch(setAirports(airports));

        const firstPageBookings = await API.Bookings.list(0, 2);
        dispatch(setBookings(firstPageBookings));
      } catch (err) {
        console.error("API Error Details:", err);
      }
    })();
  }, [dispatch]);

  const handleLoadMore = useCallback(async () => {
    if (hasMore) {
      try {
        const nextPage = page + 1;
        const nextBookings = await API.Bookings.list(nextPage, 2);

        if (nextBookings.list.length > 0) {
          dispatch(appendBookings(nextBookings.list));
          setPage(nextPage);
        } else {
          false;
        }
      } catch (err) {
        console.error("Load more failed:", err);
      }
    }
  }, [dispatch, page, bookings]);

  const handleCreate = useCallback(
    async (values: BookingFormValues) => {
      try {
        const created = await API.Bookings.create(values);

        dispatch(addBooking(created));
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
          <BookingList
            items={listItems}
            onDelete={handleDelete}
            onReachEnd={handleLoadMore}
          />
        </BookingCard>
      </div>
    </div>
  );
}
