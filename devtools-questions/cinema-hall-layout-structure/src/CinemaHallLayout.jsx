import * as React from "react";

const ROWS = [
  { label: "A", seats: 10, type: "vip" },
  { label: "B", seats: 12, type: "vip" },
  { label: "C", seats: 14, type: "standard" },
  { label: "D", seats: 14, type: "standard" },
  { label: "E", seats: 16, type: "standard" },
  { label: "F", seats: 16, type: "economy" },
  { label: "G", seats: 16, type: "economy" },
];

const RESERVED_SEATS = new Set(["A5", "A6", "B8", "C10", "E3", "E4", "F12", "G1"]);
const AISLES = [4, 5, 10]; // Seat indexes after which to render aisle gap

export function CinemaHallLayout() {
  const [selected, setSelected] = React.useState(new Set());

  const toggleSeat = (seatId, meta) => {
    if (meta.status !== "available") return;
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(seatId)) {
        next.delete(seatId);
      } else {
        next.add(seatId);
      }
      return next;
    });
  };

  const totalSelected = selected.size;

  return (
    <div className="cinema-app">
      <header>
        <h1>Cinema Hall Layout</h1>
        <p>
          Visualise seat classes, aisles, and reservations. Click available seats to select them and see pricing tiers in
          the legend.
        </p>
      </header>
      <section className="card screen-card">
        <div className="screen">SCREEN</div>
        <p className="screen-hint">Front</p>
      </section>
      <section className="card layout-card" aria-label="Seat map">
        {ROWS.map((row) => (
          <Row
            key={row.label}
            row={row}
            selected={selected}
            onSeatToggle={toggleSeat}
          />
        ))}
      </section>
      <section className="card legend-card">
        <Legend />
        <p className="summary">
          Selected seats: <strong>{totalSelected}</strong>{" "}
          {totalSelected > 0 && `(${Array.from(selected).join(", ")})`}
        </p>
      </section>
    </div>
  );
}

function Row({ row, selected, onSeatToggle }) {
  const seats = Array.from({ length: row.seats }, (_, index) => {
    const seatNumber = index + 1;
    const seatId = `${row.label}${seatNumber}`;
    const isReserved = RESERVED_SEATS.has(seatId);
    const status = isReserved ? "reserved" : "available";
    const isSelected = selected.has(seatId);
    const isEmpty = row.type === "aisle";

    return {
      id: seatId,
      number: seatNumber,
      status: isEmpty ? "empty" : status,
      type: row.type,
      isSelected,
    };
  });

  return (
    <div className="seat-row" role="group" aria-label={`Row ${row.label}`}>
      <span className="row-label">{row.label}</span>
      <div className="seat-grid">
        {seats.map((seat, index) => (
          <React.Fragment key={seat.id}>
            <Seat seat={seat} onToggle={onSeatToggle} />
            {AISLES.includes(index + 1) && <span className="aisle" aria-hidden="true" />}
          </React.Fragment>
        ))}
      </div>
      <span className="row-label">{row.label}</span>
    </div>
  );
}

function Seat({ seat, onToggle }) {
  const { id, number, status, type, isSelected } = seat;
  const className = ["seat", type, status, isSelected ? "selected" : ""].filter(Boolean).join(" ");

  return (
    <button
      type="button"
      className={className}
      onClick={() => onToggle(id, seat)}
      disabled={status !== "available"}
      aria-pressed={isSelected}
      aria-label={`Seat ${id}, ${type} ${status}`}
    >
      {number}
    </button>
  );
}

function Legend() {
  const tiers = [
    { label: "VIP", className: "vip" },
    { label: "Standard", className: "standard" },
    { label: "Economy", className: "economy" },
    { label: "Reserved", className: "reserved" },
    { label: "Selected", className: "selected" },
  ];
  return (
    <div className="legend">
      {tiers.map((tier) => (
        <div key={tier.label} className="legend-item">
          <span className={`badge ${tier.className}`} aria-hidden="true" />
          <span>{tier.label}</span>
        </div>
      ))}
    </div>
  );
}
