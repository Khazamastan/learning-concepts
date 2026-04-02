import { useActionState } from "react";
import { useFormStatus } from "react-dom";

const INITIAL_STATE = {
  totalLogs: 5,
  ways: null,
  error: null,
};

function countLogJumps(n) {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error("Total logs must be a non-negative integer");
  }
  if (n <= 1) return 1;
  let one = 1;
  let two = 1;
  let three = 0;
  for (let i = 2; i <= n; i += 1) {
    const current = one + two + three;
    three = two;
    two = one;
    one = current;
  }
  return one;
}

function SubmitButton({ children }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Counting…" : children}
    </button>
  );
}

async function computeState(_prev, formData) {
  const raw = formData.get("totalLogs") ?? "0";
  const totalLogs = Number(raw);
  try {
    const ways = countLogJumps(totalLogs);
    return { totalLogs, ways, error: null };
  } catch (error) {
    return {
      totalLogs,
      ways: null,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export default function LogJumpPlanner() {
  const [state, submitAction] = useActionState(computeState, INITIAL_STATE);

  return (
    <section>
      <h2>Wooden Log Jump Planner (React 19)</h2>
      <form action={submitAction}>
        <label>
          Total logs (finish index)
          <input
            name="totalLogs"
            type="number"
            min="0"
            defaultValue={state.totalLogs}
            style={{ marginLeft: 8 }}
          />
        </label>
        <div style={{ marginTop: 12 }}>
          <SubmitButton>Count paths</SubmitButton>
        </div>
      </form>

      <div style={{ marginTop: 16 }}>
        {state.error ? (
          <p role="alert" style={{ color: "crimson" }}>
            {state.error}
          </p>
        ) : state.ways !== null ? (
          <p>
            There {state.ways === 1 ? "is" : "are"} <strong>{state.ways}</strong>{" "}
            distinct way{state.ways === 1 ? "" : "s"} to reach log {state.totalLogs}.
          </p>
        ) : (
          <p>Enter the number of logs to calculate jump combinations.</p>
        )}
      </div>
    </section>
  );
}
