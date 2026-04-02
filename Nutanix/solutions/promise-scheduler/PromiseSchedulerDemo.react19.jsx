import { useEffect, useState, useTransition } from "react";
import { createTask } from "./promiseScheduler";

/**
 * React 19-friendly variant that surfaces transition state while the scheduler resolves.
 */
export default function PromiseSchedulerDemoReact19() {
  const [output, setOutput] = useState([]);
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const task = createTask();

    task.addJob("loadUser", () => Promise.resolve("user"), { priority: 5 });
    task.addJob(
      "loadProfile",
      () => Promise.resolve("profile"),
      { priority: 10, dependsOn: "loadUser" }
    );
    task.addJob(
      "loadSession",
      () => Promise.resolve("session"),
      { priority: 1, dependsOn: "loadProfile" }
    );

    task
      .run()
      .then((results) => {
        startTransition(() => setOutput(results));
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <div role="alert">Scheduler error: {error}</div>;
  }

  return (
    <section aria-busy={isPending}>
      <h1>Promise Scheduler Demo (React 19)</h1>
      {isPending && <p>Computing job order…</p>}
      <ul>
        {output.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
