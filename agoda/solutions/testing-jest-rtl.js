"use strict";

const React = require("react");

function Counter({ initial = 0, step = 1, onChange }) {
  const [value, setValue] = React.useState(initial);

  const update = (delta) => {
    const next = value + delta;
    setValue(next);
    onChange?.(next);
  };

  return (
    <div>
      <span aria-label="counter-value">{value}</span>
      <button type="button" onClick={() => update(step)}>
        Increment
      </button>
      <button type="button" onClick={() => update(-step)}>
        Decrement
      </button>
    </div>
  );
}

/**
 * Factory to register Jest + RTL tests demonstrating black-box, white-box, and grey-box strategies.
 *
 * @param {object} deps
 * @param {Function} deps.render
 * @param {object} deps.screen
 * @param {object} deps.userEvent
 */
function createCounterTests({ render, screen, userEvent }) {
  describe("Counter component", () => {
    test("black-box: renders initial value and increments on click", async () => {
      const user = userEvent.setup();
      render(<Counter initial={5} />);

      const value = screen.getByLabelText("counter-value");
      expect(value).toHaveTextContent("5");

      await user.click(screen.getByRole("button", { name: /increment/i }));
      expect(value).toHaveTextContent("6");
    });

    test("white-box: invokes onChange callback with new value", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(<Counter onChange={onChange} />);

      await user.click(screen.getByRole("button", { name: /increment/i }));
      expect(onChange).toHaveBeenCalledWith(1);
    });

    test("grey-box: respects custom step size", async () => {
      const user = userEvent.setup();
      render(<Counter initial={10} step={3} />);

      await user.click(screen.getByRole("button", { name: /decrement/i }));
      expect(screen.getByLabelText("counter-value")).toHaveTextContent("7");
    });
  });
}

module.exports = { Counter, createCounterTests };
