import type { BookingFormValues } from "@/components/bookings/BookingForm";

export type BookingFormErrors = {
  firstName?: string;
  lastName?: string;
  departureAirportId?: string;
  arrivalAirportId?: string;
  departureDate?: string;
  returnDate?: string;
};

export const validateField = (
  key: keyof BookingFormValues,
  value: any
): string | undefined => {
  switch (key) {
    case "firstName":
      if (!value) {
        return "This field is required";
      }
      if (/\d/.test(value)) {
        return "First name cannot contain numbers";
      }
      return undefined;
    case "lastName":
      if (!value) {
        return "This field is required";
      }
      if (/\d/.test(value)) {
        return "Last name cannot contain numbers";
      }
      return undefined;
    case "departureAirportId":
      return !value || value === 0 ? "This field is required" : undefined;
    case "arrivalAirportId":
      return !value || value === 0 ? "This field is required" : undefined;
    case "departureDate":
      return !value ? "This field is required" : undefined;
    case "returnDate":
      if (!value) return "This field is required";
      return undefined;
    default:
      return undefined;
  }
};

export const validateForm = (values: BookingFormValues): BookingFormErrors => {
  const newErrors: BookingFormErrors = {};

  Object.keys(values).forEach((key) => {
    const fieldKey = key as keyof BookingFormValues;
    const error = validateField(fieldKey, values[fieldKey]);
    if (error) {
      newErrors[fieldKey] = error;
    }
  });

  return newErrors;
};

export const isFormValid = (errors: BookingFormErrors): boolean => {
  return Object.keys(errors).length === 0;
};
