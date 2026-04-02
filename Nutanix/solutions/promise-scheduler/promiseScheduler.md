# Promise Scheduler

## Overview
The promise scheduler coordinates asynchronous jobs that declare both a priority and optional dependencies. It ensures higher-priority work runs first **once** all prerequisite jobs have completed, ultimately returning the resolved values in execution order.

## Key Concepts
- **Job registry:** Each job stores its name, async factory, priority, dependency list, and status inside a `Map`.
- **Dependency gating:** A job becomes runnable only when every dependency name appears in the completed set.
- **Priority selection:** Among all runnable jobs, the scheduler picks the highest priority by sorting the ready list.
- **Result aggregation:** Results resolve sequentially and accumulate in `resultsInOrder`, mirroring the execution sequence.
- **Failure handling:** If any job rejects, the scheduler throws an error tagged with the job name. Unresolved dependency chains also trigger a descriptive error.

## Execution Flow
1. Register jobs with `addJob(name, fn, { priority, dependsOn })`.
2. Invoke `run()` to iterate:
   - Build the set of dependency-satisfied jobs.
   - Choose the highest priority job and await its promise.
   - Mark it complete and push the resolved value.
3. Repeat until no runnable jobs remain.
4. Throw if any pending job still has unmet dependencies; otherwise return the results array.

## Sample Usage
```javascript
import { createTask } from "./promiseScheduler";

const task = createTask();
task.addJob("loadUser", () => Promise.resolve("user"), { priority: 5 });
task.addJob("loadProfile", () => Promise.resolve("profile"), {
  priority: 10,
  dependsOn: "loadUser",
});
task.addJob("loadSession", () => Promise.resolve("session"), {
  priority: 1,
  dependsOn: "loadProfile",
});

task.run().then(console.log); // ["user", "profile", "session"]
```

## Extending the Scheduler
- **Performance:** Swap the simple `sort` call in `pickNext` with a binary heap for hundreds of jobs.
- **Parallelism:** Allow multiple jobs to run concurrently by dequeuing more than one ready job at a time.
- **Timeouts/retries:** Wrap `job.fn` to enforce timeouts or implement retry logic before marking a job failed.
