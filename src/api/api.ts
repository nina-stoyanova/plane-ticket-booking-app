import type { Airport, Booking, BookingFull, Page } from "./types";

const API_BASE = import.meta.env.VITE_API_BASE;
if (!API_BASE) {
  throw new Error("API_BASE is not set");
}

const TOKEN_KEY = import.meta.env.VITE_TOKEN;
if (!TOKEN_KEY) {
  throw new Error("TOKEN_KEY is not set");
}

export class ApiError extends Error {
  status: number;
  body?: unknown;
  constructor(message: string, status: number, body?: unknown) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

async function http<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = TOKEN_KEY;
  const headers: HeadersInit = {
    Accept: "application/json",
    ...(init.body instanceof FormData
      ? {}
      : { "Content-Type": "application/json" }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(init.headers ?? {}),
  };

  const rawResponse = await fetch(`${API_BASE}${path}`, { ...init, headers });

  let parsedResponse: any = null;

  try {
    parsedResponse = await rawResponse.json();
  } catch (error) {
    console.error("Error parsing JSON", error);
  }

  if (!rawResponse.ok) {
    throw new ApiError(
      parsedResponse?.message || rawResponse.statusText,
      rawResponse.status,
      parsedResponse
    );
  }
  return parsedResponse as T;
}

export const API = {
  Airports: {
    list(): Promise<Airport[]> {
      return http<Airport[]>("/airports");
    },
  },
  Bookings: {
    list(page?: number, size?: number): Promise<Page<BookingFull>> {
      const qs = new URLSearchParams();
      if (page != null) qs.set("page", String(page));
      if (size != null) qs.set("size", String(size));
      const suffix = qs.toString() ? `?${qs}` : "";
      return http<Page<BookingFull>>(`/bookings${suffix}`);
    },

    getById(id: number): Promise<BookingFull> {
      return http<BookingFull>(`/bookings/${id}`);
    },

    create(payload: Omit<Booking, "id">): Promise<BookingFull> {
      return http<BookingFull>("/bookings/create", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },

    remove(id: number): Promise<{ success: boolean }> {
      return http<{ success: boolean }>(`/bookings/delete/${id}`, {
        method: "DELETE",
      });
    },
  },
};
