import BookingCard from "./components/bookings/BookingCard";
import BookingForm from "./components/bookings/BookingForm";
import type { BookingItem } from "./components/bookings/BookingList";
import BookingList from "./components/bookings/BookingList";

export default function App() {
  const airports = [
    { value: 1, label: "SOF — Sofia" },
    { value: 2, label: "BER — Berlin" },
    { value: 3, label: "LHR — London Heathrow" },
  ];

  const items: BookingItem[] = [
    {
      id: 1,
      firstName: "Anna",
      lastName: "K",
      departureDate: "2025-10-01",
      returnDate: "2025-10-05",
    },
    {
      id: 2,
      firstName: "John",
      lastName: "D",
      departureDate: "2025-11-12",
      returnDate: "2025-11-18",
    },
  ];

  return (
    <div className="page">
      <div className="container">
        <h1 className="title">Booking app</h1>

        <BookingCard>
          <BookingForm airports={airports} />
        </BookingCard>

        <BookingCard>
          <BookingList items={items} />
        </BookingCard>
      </div>
    </div>
  );
}
