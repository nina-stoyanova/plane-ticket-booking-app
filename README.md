# Plane Ticket Booking App

A simple **React + Redux** plane ticket booking frontend.  
Implements the UI for creating, listing, and removing bookings with infinite scroll and a modal for booking details.

---

## Features

- **Create booking** – form with validation:
  - first name
  - last name
  - departure airport
  - destination airport
  - departure date
  - date of return
- **List bookings** – infinite scroll
- **Delete booking** – remove an item directly from the list
- **View booking details** – open booking details in a modal window
- **Redux state management** – slices, selectors, and hooks
- **Custom hooks** – `useInitialLoad`, `useBookingDetails`, `useIntersectionObserver`

---

## Tech Stack

- **React 18 + TypeScript**
- **Redux Toolkit** for state management
- **Vite** for fast development and bundling
- Plain **CSS modules** (no external UI frameworks)
- **Jest + React Testing Library** for basic testing

---

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm run test
```
