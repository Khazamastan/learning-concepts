import * as React from "react";
import { useThrottle } from "./useThrottle";

const DEFAULT_COLOR = "#5d8ffc";
const DEFAULT_DELAY = 150;

export function InteractiveColorPicker() {
  const [color, setColor] = React.useState(DEFAULT_COLOR);
  const [delay, setDelay] = React.useState(DEFAULT_DELAY);
  const throttledColor = useThrottle(color, delay);
  const [events, setEvents] = React.useState(() => []);

  React.useEffect(() => {
    setEvents((previous) =>
      [{ color, type: "raw", at: Date.now() }, ...previous].slice(0, 8),
    );
  }, [color]);

  React.useEffect(() => {
    setEvents((previous) =>
      [{ color: throttledColor, type: "throttled", at: Date.now() }, ...previous].slice(
        0,
        8,
      ),
    );
  }, [throttledColor]);

  return (
    <div className="color-picker">
      <header>
        <h1>Interactive Color Picker</h1>
        <p>
          Drag the color input freely&mdash;the large preview updates using a{" "}
          <strong>throttled</strong> value so expensive renders or network calls
          won&apos;t happen more often than every <code>{delay}ms</code>.
        </p>
      </header>

      <section className="controls">
        <label className="control">
          <span>Pick a color</span>
          <input
            type="color"
            value={color}
            onChange={(event) => setColor(event.target.value)}
          />
        </label>

        <label className="control">
          <span>Throttle interval (ms)</span>
          <input
            type="range"
            min="0"
            max="1000"
            step="50"
            value={delay}
            onChange={(event) => setDelay(Number(event.target.value))}
          />
          <span className="delay-value">{delay}ms</span>
        </label>
      </section>

      <section className="previews">
        <div className="preview">
          <h2>Raw color</h2>
          <div
            className="swatch"
            style={{ backgroundColor: color }}
            aria-label={`Raw color ${color}`}
          />
          <code>{color}</code>
        </div>
        <div className="preview">
          <h2>Throttled color</h2>
          <div
            className="swatch"
            style={{ backgroundColor: throttledColor }}
            aria-label={`Throttled color ${throttledColor}`}
          />
          <code>{throttledColor}</code>
        </div>
      </section>

      <section className="timeline">
        <h2>Recent updates</h2>
        <ol>
          {events.map((entry, index) => (
            <li key={index} data-type={entry.type}>
              <span>{entry.type}</span>
              <code>{entry.color}</code>
              <time>
                {new Date(entry.at).toLocaleTimeString([], {
                  minute: "2-digit",
                  second: "2-digit",
                  fractionalSecondDigits: 3,
                })}
              </time>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
