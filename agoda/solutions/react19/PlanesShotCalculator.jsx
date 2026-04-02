import { useActionState } from "react";
import { useFormStatus } from "react-dom";

const INITIAL_STATE = {
  input: "1-6\n2-8\n7-12\n10-16",
  shots: null,
  error: null,
};

function parseIntervals(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const match = line.match(/^(-?\d+)\s*[-,]\s*(-?\d+)$/);
      if (!match) {
        throw new Error(`Invalid interval on line ${index + 1}: "${line}"`);
      }
      const start = Number(match[1]);
      const end = Number(match[2]);
      if (start > end) {
        throw new Error(`Start must be <= end on line ${index + 1}`);
      }
      return [start, end];
    });
}

function minimumShotsForPlanes(planes) {
  if (!planes.length) return 0;
  const sorted = [...planes].sort((a, b) => a[1] - b[1]);
  let shots = 0;
  let current = Number.NEGATIVE_INFINITY;
  for (const [start, end] of sorted) {
    if (start > current) {
      shots += 1;
      current = end;
    }
  }
  return shots;
}

function SubmitButton({ label }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Calculating…" : label}
    </button>
  );
}

async function computeState(_previousState, formData) {
  const input = formData.get("intervals") ?? "";
  try {
    const intervals = parseIntervals(input);
    const shots = minimumShotsForPlanes(intervals);
    return { input, shots, error: null };
  } catch (error) {
    return {
      input,
      shots: null,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export default function PlanesShotCalculator() {
  const [state, submitAction] = useActionState(computeState, INITIAL_STATE);

  return (
    <section>
      <h2>Minimum Planes to Shoot (React 19)</h2>
      <form action={submitAction}>
        <label>
          Intervals (one per line, like "start-end")
          <textarea
            name="intervals"
            defaultValue={state.input}
            rows={6}
            style={{ width: "100%", marginTop: 8 }}
          />
        </label>
        <div style={{ marginTop: 12 }}>
          <SubmitButton label="Compute minimum shots" />
        </div>
      </form>

      <div style={{ marginTop: 16 }}>
        {state.error ? (
          <p role="alert" style={{ color: "crimson" }}>
            {state.error}
          </p>
        ) : state.shots !== null ? (
          <p>
            You can cover these trajectories with{" "}
            <strong>{state.shots}</strong> shot
            {state.shots === 1 ? "" : "s"}.
          </p>
        ) : (
          <p>Enter intervals to compute the answer.</p>
        )}
      </div>
    </section>
  );
}
