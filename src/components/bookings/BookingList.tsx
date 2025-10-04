import Button from "@/components/ui/Button";

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
};

export default function BookingList({ items, onDelete }: BookingListProps) {
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

      <div className="sentinel" />
    </section>
  );
}
