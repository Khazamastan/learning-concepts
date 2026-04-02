import { useActionState } from "react";
import { useFormStatus } from "react-dom";

const INITIAL_STATE = {
  remoteUrl: "https://cdn.example.com/remoteEntry.js",
  status: "idle",
  error: null,
};

function SubmitButton({ children }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Checking…" : children}
    </button>
  );
}

async function checkRemote(url) {
  try {
    const response = await fetch(url, { method: "HEAD", cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Remote responded with status ${response.status}`);
    }
    return { status: "available", error: null };
  } catch (error) {
    return {
      status: "unreachable",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function computeState(_prev, formData) {
  const remoteUrl = formData.get("remoteUrl") ?? "";
  const result = await checkRemote(remoteUrl);
  return { remoteUrl, ...result };
}

export default function RemoteStatusWidget() {
  const [state, submitAction] = useActionState(computeState, INITIAL_STATE);

  return (
    <section>
      <h2>Module Federation Remote Status (React 19)</h2>
      <form action={submitAction} style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          type="url"
          name="remoteUrl"
          defaultValue={state.remoteUrl}
          placeholder="https://remote.example/remoteEntry.js"
          style={{ flex: 1 }}
        />
        <SubmitButton>Check</SubmitButton>
      </form>
      <p style={{ marginTop: 12 }}>
        Status:{" "}
        <strong style={{ color: state.status === "available" ? "green" : state.status === "unreachable" ? "crimson" : "#555" }}>
          {state.status}
        </strong>
      </p>
      {state.error && (
        <p role="alert" style={{ color: "crimson" }}>
          {state.error}
        </p>
      )}
    </section>
  );
}
