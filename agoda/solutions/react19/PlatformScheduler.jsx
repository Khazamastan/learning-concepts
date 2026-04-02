import { useActionState } from "react";
import { useFormStatus } from "react-dom";

const INITIAL_STATE = {
  arrivals: "09:00\n09:25\n09:50\n11:00",
  departures: "09:30\n11:05\n11:20\n11:30",
  platforms: null,
  error: null,
};

function parseTimes(text, label) {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const match = line.match(/^(\d{1,2}):(\d{2})$/);
      if (!match) {
        throw new Error(`Invalid ${label} time on line ${index + 1}: "${line}"`);
      }
      const hours = Number(match[1]);
      const minutes = Number(match[2]);
      if (hours > 23 || minutes > 59) {
        throw new Error(`Out-of-range ${label} time on line ${index + 1}`);
      }
      return hours * 60 + minutes;
    });
}

function minPlatformsNeeded(arrivals, departures) {
  if (arrivals.length !== departures.length) {
    throw new Error("Arrivals and departures must have the same count");
  }
  if (arrivals.length === 0) return 0;
  const a = [...arrivals].sort((x, y) => x - y);
  const d = [...departures].sort((x, y) => x - y);
  let platforms = 0;
  let maxPlatforms = 0;
  let i = 0;
  let j = 0;
  while (i < a.length && j < d.length) {
    if (a[i] <= d[j]) {
      platforms += 1;
      maxPlatforms = Math.max(maxPlatforms, platforms);
      i += 1;
    } else {
      platforms -= 1;
      j += 1;
    }
  }
  return maxPlatforms;
}

function SubmitButton({ children }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Scheduling…" : children}
    </button>
  );
}

async function computeState(_prev, formData) {
  const arrivalsText = formData.get("arrivals") ?? "";
  const departuresText = formData.get("departures") ?? "";
  try {
    const arrivals = parseTimes(arrivalsText, "arrival");
    const departures = parseTimes(departuresText, "departure");
    const platforms = minPlatformsNeeded(arrivals, departures);
    return { arrivals: arrivalsText, departures: departuresText, platforms, error: null };
  } catch (error) {
    return {
      arrivals: arrivalsText,
      departures: departuresText,
      platforms: null,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export default function PlatformScheduler() {
  const [state, submitAction] = useActionState(computeState, INITIAL_STATE);

  return (
    <section>
      <h2>Platform Scheduler (React 19)</h2>
      <form action={submitAction} style={{ display: "grid", gap: 12 }}>
        <label>
          Arrivals (HH:MM per line)
          <textarea name="arrivals" defaultValue={state.arrivals} rows={4} style={{ width: "100%", marginTop: 4 }} />
        </label>
        <label>
          Departures (HH:MM per line)
          <textarea
            name="departures"
            defaultValue={state.departures}
            rows={4}
            style={{ width: "100%", marginTop: 4 }}
          />
        </label>
        <SubmitButton>Calculate minimum platforms</SubmitButton>
      </form>

      <div style={{ marginTop: 16 }}>
        {state.error ? (
          <p role="alert" style={{ color: "crimson" }}>
            {state.error}
          </p>
        ) : state.platforms !== null ? (
          <p>
            You need at least <strong>{state.platforms}</strong> platform
            {state.platforms === 1 ? "" : "s"} to avoid delays.
          </p>
        ) : (
          <p>Provide arrival and departure schedules to compute the platform requirement.</p>
        )}
      </div>
    </section>
  );
}
