type Props = {
  details: {
    firstName: string;
    lastName: string;
    departureAirportId: number;
    arrivalAirportId: number;
    departureDate: string;
    returnDate: string;
  };
  getAirportName: (id: number) => string;
  formatDate: (iso: string) => string;
};

export default function BookingDetailsContent({
  details,
  getAirportName,
  formatDate,
}: Props) {
  return (
    <div>
      <div>
        <span className="muted">Name:</span> {details.firstName}{" "}
        {details.lastName}
      </div>
      <div>
        <span className="muted">Itinerary:</span>{" "}
        {getAirportName(details.departureAirportId)} →{" "}
        {getAirportName(details.arrivalAirportId)}
      </div>
      <div>
        <span className="muted">Departure:</span>{" "}
        {formatDate(details.departureDate)}
      </div>
      <div>
        <span className="muted">Return:</span> {formatDate(details.returnDate)}
      </div>
    </div>
  );
}
