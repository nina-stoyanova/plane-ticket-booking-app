export type BookingId = number;

export interface Airport {
  id: number;
  code: string;
  title: string;
}

export interface Booking {
  id?: BookingId;
  firstName: string;
  lastName: string;
  departureAirportId: number;
  arrivalAirportId: number;
  departureDate: string; 
  returnDate: string;   
}

export type BookingFull = Required<Booking>;

export interface Page<T> {
  list: T[];
  totalCount: number;
}
