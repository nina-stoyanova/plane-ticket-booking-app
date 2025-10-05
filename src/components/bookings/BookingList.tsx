import Button from "@/components/ui/Button";
import { useIntersectionObserver } from "@/state/UseIntersectionObserver";
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
  onReachEnd?: () => void;
};

export default function BookingList({
  items,
  onDelete,
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
      {items.map((b) => (
        <article key={b.id} className="card">
          <div className="card__top">
            <div className="card__title">
              {b.firstName} {b.lastName}
            </div>
            <div className="card__meta">
              {b.departureDate} → {b.returnDate}
            </div>
          </div>

          <div className="card__actions">
            <Button
              type="delete"
              label="Delete"
              onClick={() => onDelete?.(b.id)}
            />
          </div>
        </article>
      ))}

      <div ref={containerRef} style={{ height: "1px" }} />

      {<p>No more bookings</p>}
    </section>
  );
}
