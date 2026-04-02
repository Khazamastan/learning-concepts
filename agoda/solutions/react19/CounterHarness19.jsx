import { useActionState, useOptimistic } from "react";
import { useFormStatus } from "react-dom";

const INITIAL_STATE = {
  initial: 0,
  step: 1,
  value: 0,
};

function Counter({ value }) {
  return (
    <div>
      <span aria-label="counter-value" style={{ fontSize: 24, fontWeight: 600 }}>
        {value}
      </span>
    </div>
  );
}

function SubmitButton({ children }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Applying…" : children}
    </button>
  );
}

async function computeState(previousState, formData) {
  const initial = Number(formData.get("initial") ?? 0);
  const step = Number(formData.get("step") ?? 1);
  const direction = formData.get("direction") ?? "increment";
  const delta = direction === "decrement" ? -step : step;
  const value = previousState.value + delta;
  return { initial, step, value };
}

export default function CounterHarness19() {
  const [state, formAction] = useActionState(computeState, INITIAL_STATE);
  const [optimisticValue, addOptimistic] = useOptimistic(state.value, (_, next) => next);

  const handleSubmit = async (formData) => {
    const direction = formData.get("direction") ?? "increment";
    const step = Number(formData.get("step") ?? 1);
    const delta = direction === "decrement" ? -step : step;
    addOptimistic(optimisticValue + delta);
    return formAction(formData);
  };

  return (
    <section>
      <h2>Counter Harness (React 19)</h2>
      <Counter value={optimisticValue} />
      <form action={handleSubmit} style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 12 }}>
        <label>
          Step
          <input type="number" name="step" defaultValue={state.step} style={{ width: 80, marginLeft: 4 }} />
        </label>
        <button type="submit" name="direction" value="increment">
          Increment
        </button>
        <button type="submit" name="direction" value="decrement">
          Decrement
        </button>
        <SubmitButton>Apply step</SubmitButton>
      </form>
    </section>
  );
}
