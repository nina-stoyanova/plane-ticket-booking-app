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
  selectSelectedBookingDetails,
  selectSelectedBookingId,
  setAirports,
  setBookingDetails,
  setBookings,
  setSelectedBookingId,
} from "./state/bookingsSlice";
import { useCallback, useEffect, useState } from "react";
import { API } from "./api/api";
import Modal from "./components/ui/Modal";
import { formatDate } from "./utils/formatDate";

export default function App() {
  const dispatch = useDispatch();

  const airports = useSelector((s: RootState) => selectAirports(s));
  const bookings = useSelector((s: RootState) => selectBookings(s));
  const selectedBookingId = useSelector((s: RootState) =>
    selectSelectedBookingId(s)
  );
  const selectedBookingDetails = useSelector((s: RootState) =>
    selectSelectedBookingDetails(s)
  );
  const hasMore = useSelector((s: RootState) => selectHasMoreBookingToLoad(s));

  const [page, setPage] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(false);

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

  const handleLoadMore = useCallback(async () => {
    if (!hasMore) return;
    try {
      const nextPage = page + 1;
      const nextBookings = await API.Bookings.list(nextPage, 5);
      if (nextBookings.list.length > 0) {
        dispatch(appendBookings(nextBookings.list));
        setPage(nextPage);
      }
    } catch (err) {
      console.error("Load more failed:", err);
    }
  }, [dispatch, page, hasMore]);

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

  const handleViewBookingDetails = useCallback(
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

  const getAirportName = (airportId: number) => {
    const airport = airports.find((a) => a.id === airportId);
    return `${airport?.code} — ${airport?.title}`;
  };

  return (
    <div className="page">
      <div className="container">
        <h1 className="title">Booking app</h1>

        <BookingCard>
          <BookingForm airports={airportOptions} onCreate={handleCreate} />
        </BookingCard>

        {listItems.length > 0 && (
          <BookingCard>
            <BookingList
              items={listItems}
              onDelete={handleDelete}
              onView={handleViewBookingDetails}
              onReachEnd={handleLoadMore}
            />
          </BookingCard>
        )}
        <Modal
          open={detailsOpen}
          onClose={() => setDetailsOpen(false)}
          title="Booking details"
          content={
            selectedBookingDetails && (
              <div>
                <div>
                  <span className="muted">Name:</span>{" "}
                  {selectedBookingDetails.firstName}{" "}
                  {selectedBookingDetails.lastName}
                </div>
                <div>
                  <span className="muted">Itinerary:</span>{" "}
                  {getAirportName(selectedBookingDetails.departureAirportId)} →{" "}
                  {getAirportName(selectedBookingDetails.arrivalAirportId)}
                </div>
                <div>
                  <span className="muted">Departure:</span>{" "}
                  {formatDate(selectedBookingDetails.departureDate)}
                </div>
                <div>
                  <span className="muted">Return:</span>{" "}
                  {formatDate(selectedBookingDetails.returnDate)}
                </div>
              </div>
            )
          }
        />
      </div>
    </div>
  );
}
