import * as React from "react";
import { PromiseScheduler } from "./PromiseScheduler";

const scheduler = new PromiseScheduler({ concurrency: 2 });

function createTask(id, duration) {
  return () =>
    new Promise((resolve) => {
      setTimeout(() => resolve({ id, duration }), duration);
    });
}

export function PromiseSchedulerDemo() {
  const [log, setLog] = React.useState([]);
  const [pendingTasks, setPendingTasks] = React.useState(0);
  const [autoStart, setAutoStart] = React.useState(true);

  const appendLog = React.useCallback((entry) => {
    setLog((previous) => [{ id: crypto.randomUUID(), ...entry }, ...previous]);
  }, []);

  const scheduleTask = React.useCallback(() => {
    const duration = Math.floor(Math.random() * 2500) + 500;
    const taskId = Date.now().toString(36);
    setPendingTasks((count) => count + 1);

    const promise = scheduler.add(createTask(taskId, duration));
    appendLog({ type: "queued", message: `Task ${taskId} queued (${duration}ms)` });

    promise
      .then(({ id }) => {
        appendLog({ type: "success", message: `Task ${id} finished` });
      })
      .catch((error) => {
        appendLog({ type: "error", message: error.message });
      })
      .finally(() => {
        setPendingTasks((count) => Math.max(0, count - 1));
      });
  }, [appendLog]);

  React.useEffect(() => {
    scheduler.autoStart = autoStart;
    if (autoStart) {
      scheduler.start();
    }
  }, [autoStart]);

  const toggleScheduler = () => {
    if (scheduler.isRunning) {
      scheduler.pause();
      appendLog({ type: "info", message: "Scheduler paused" });
    } else {
      scheduler.start();
      appendLog({ type: "info", message: "Scheduler resumed" });
    }
  };

  const clearTasks = () => {
    scheduler.clear();
    setPendingTasks(0);
    appendLog({ type: "warning", message: "Pending tasks cleared" });
  };

  return (
    <div className="scheduler">
      <header>
        <h1>Promise Scheduler</h1>
        <p>
          Controls how many asynchronous jobs run in parallel. In this demo, tasks are
          random timeout-based promises.
        </p>
      </header>

      <section className="actions">
        <button type="button" onClick={scheduleTask}>
          Queue Task
        </button>
        <button type="button" onClick={toggleScheduler}>
          {scheduler.isRunning ? "Pause Scheduler" : "Resume Scheduler"}
        </button>
        <button type="button" onClick={clearTasks} disabled={!pendingTasks}>
          Clear Pending
        </button>
        <label>
          <input
            type="checkbox"
            checked={autoStart}
            onChange={(event) => setAutoStart(event.target.checked)}
          />
          Auto start new tasks
        </label>
      </section>

      <section className="status">
        <span>Active: {scheduler.activeCount}</span>
        <span>Queued: {pendingTasks}</span>
        <span>Concurrency: {scheduler.concurrency}</span>
      </section>

      <section className="log">
        <h2>Activity</h2>
        <ul>
          {log.map((entry) => (
            <li key={entry.id} data-type={entry.type}>
              {entry.message}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
