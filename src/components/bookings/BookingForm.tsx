import Field from "@/components/ui/Field";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

export type AirportOption = { value: number; label: string };

export type BookingFormValues = {
  firstName: string;
  lastName: string;
  departureAirportId: number;
  arrivalAirportId: number;
  departureDate: string;
  returnDate: string;
};

export type BookingFormProps = {
  airports: AirportOption[];
};

export default function BookingForm({ airports }: BookingFormProps) {
  return (
    <form className="form-grid">
      <Field id="firstName" label="First name" placeholder="John" />
      <Field id="lastName" label="Last name" placeholder="Doe" />

      <Select
        id="dep"
        label="Departure airport"
        placeholder="Select departure"
        options={airports}
      />
      <Select
        id="arr"
        label="Arrival airport"
        placeholder="Select arrival"
        options={airports}
      />

      <Field id="d1" label="Departure date" type="date" />
      <Field id="d2" label="Return date" type="date" />

      <div className="form-actions">
        <Button type="submit" label="Create booking" />
        <Button type="reset" label="Reset" />
      </div>
    </form>
  );
}
