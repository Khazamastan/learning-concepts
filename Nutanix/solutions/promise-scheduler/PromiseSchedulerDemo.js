import { useEffect, useState } from "react";
import { createTask } from "./promiseScheduler";

/**
 * Minimal React demo showcasing the promise scheduler.
 */
export default function PromiseSchedulerDemo() {
  const [output, setOutput] = useState([]);
  const [error, setError] = useState(null);

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
      .then(setOutput)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <div>Scheduler error: {error}</div>;
  }

  return (
    <div>
      <h1>Promise Scheduler Demo</h1>
      <ul>
        {output.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
