import Button from "@/components/ui/Button";
import { useIntersectionObserver } from "@/state/hooks/useIntersectionObserver";
import { formatDate } from "@/utils/formatDate";
import { useEffect } from "react";

export type BookingItem = {
  id: number;
  firstName: string;
  lastName: string;
  departureDate: string;
  returnDate: string;
};

export type BookingListProps = {
  items: BookingItem[];
  onDelete?: (id: number) => void;
  onView?: (id: number) => void;
  onReachEnd?: () => void;
};

export default function BookingList({
  items,
  onDelete,
  onView,
  onReachEnd,
}: BookingListProps) {
  const { containerRef, isVisible } = useIntersectionObserver({
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  });

  useEffect(() => {
    if (isVisible) {
      onReachEnd?.();
    }
  }, [isVisible, onReachEnd]);

  return (
    <section className="list">
      {items.map((booking) => (
        <article key={booking.id} className="card">
          <div className="card__top">
            <div className="card__title">
              {booking.firstName} {booking.lastName}
            </div>
            <div className="card__meta">
              {formatDate(booking.departureDate)} →{" "}
              {formatDate(booking.returnDate)}
            </div>
          </div>

          <div className="card__actions">
            <Button
              type="delete"
              label="Delete"
              onClick={() => onDelete?.(booking.id)}
            />
            <Button
              type="view"
              label="View"
              onClick={() => onView?.(booking.id)}
            />
          </div>
        </article>
      ))}

      {items.length > 0 && (
        <div ref={containerRef} style={{ height: "1px" }}></div>
      )}
    </section>
  );
}
