export type BookingCardProps = { children?: React.ReactNode };

export default function BookingCard({ children }: BookingCardProps) {
  return <article className="card">{children}</article>;
}
