/**
 * Dependency-aware promise scheduler with priority support.
 */
export function createTask() {
  const jobs = new Map();

  /**
   * Register a new job.
   * @param {string} name unique identifier
   * @param {() => Promise<any>} fn async factory returning a promise
   * @param {{priority?: number, dependsOn?: string|string[]}} options
   */
  const addJob = (name, fn, options = {}) => {
    if (jobs.has(name)) {
      throw new Error(`Job "${name}" already registered`);
    }
    const { priority = 0, dependsOn = null } = options;
    jobs.set(name, {
      name,
      fn,
      priority,
      dependsOn: dependsOn ? [].concat(dependsOn) : [],
      status: "pending",
      result: undefined,
    });
  };

  /**
   * Execute jobs honoring declared dependencies and priorities.
   * @returns {Promise<any[]>} resolves in execution order
   */
  const run = async () => {
    const completed = new Set();
    const resultsInOrder = [];

    const pickNext = () => {
      const ready = Array.from(jobs.values()).filter(
        (job) =>
          job.status === "pending" &&
          job.dependsOn.every((dep) => completed.has(dep))
      );
      if (!ready.length) return null;
      ready.sort((a, b) => b.priority - a.priority);
      return ready[0];
    };

    let nextJob = pickNext();
    while (nextJob) {
      const job = nextJob;
      job.status = "running";
      try {
        const output = await job.fn();
        job.status = "done";
        job.result = output;
        completed.add(job.name);
        resultsInOrder.push(output);
      } catch (err) {
        job.status = "failed";
        throw new Error(`Job "${job.name}" failed: ${err?.message || err}`);
      }
      nextJob = pickNext();
    }

    const unfinished = Array.from(jobs.values()).filter(
      (job) => job.status === "pending"
    );
    if (unfinished.length) {
      const missingDeps = unfinished
        .map((job) => {
          const pendingDeps = job.dependsOn.filter((dep) => !completed.has(dep));
          return `${job.name} (waiting on ${pendingDeps.join(", ") || "unknown"})`;
        })
        .join("; ");
      throw new Error(
        `Cannot complete schedule, unresolved dependencies: ${missingDeps}`
      );
    }

    return resultsInOrder;
  };

  return { addJob, run };
}
