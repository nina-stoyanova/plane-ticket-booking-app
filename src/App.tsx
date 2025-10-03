import Button from "./components/ui/Button";
import Field from "./components/ui/Field";
import Select from "./components/ui/Select";

//card, form, card, list

export default function App() {
  const airports = [
    { value: 1, label: "SOF — Sofia" },
    { value: 2, label: "BER — Berlin" },
    { value: 3, label: "LHR — London Heathrow" },
  ];

  return (
    <div className="page">
      <div className="container">
        <h1 className="title">Booking app</h1>

        {/* Create booking */}
        <section className="panel">
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
        </section>

        {/* Existing bookings */}
        <section className="list">
          <article className="card">
            <div className="card__top">
              <div className="card__title">Anna K</div>
              <div className="card__meta">2025-10-01 → 2025-10-05</div>
            </div>
            <div className="card__actions">
              <Button type="delete" label="Delete"></Button>
            </div>
          </article>

          <div className="sentinel" />
        </section>
      </div>
    </div>
  );
}
