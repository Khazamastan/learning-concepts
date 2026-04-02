import * as React from "react";

export function FlippingCard({
  front,
  back,
  flipped: flippedProp,
  onFlippedChange,
  className = "",
}) {
  const isControlled = typeof flippedProp === "boolean";
  const [uncontrolledFlipped, setUncontrolledFlipped] = React.useState(false);
  const flipped = isControlled ? flippedProp : uncontrolledFlipped;

  const toggle = () => {
    const next = !flipped;
    if (!isControlled) {
      setUncontrolledFlipped(next);
    }
    onFlippedChange?.(next);
  };

  return (
    <div className={`flip-card ${flipped ? "is-flipped" : ""} ${className}`}>
      <button type="button" className="flip-card-inner" onClick={toggle}>
        <div className="flip-card-face flip-card-front">{front}</div>
        <div className="flip-card-face flip-card-back">{back}</div>
      </button>
    </div>
  );
}

FlippingCard.Front = function Front({ icon, title, description }) {
  return (
    <div className="card-content">
      <span className="card-icon" aria-hidden="true">
        {icon}
      </span>
      <h2>{title}</h2>
      <p>{description}</p>
      <span className="hint">Click to flip</span>
    </div>
  );
};

FlippingCard.Back = function Back({ title, bullets }) {
  return (
    <div className="card-content">
      <h3>{title}</h3>
      <ul>
        {bullets.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <span className="hint">Click to return</span>
    </div>
  );
};
