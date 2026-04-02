/**
 * A small Promise scheduler that lets you control how many async tasks run in parallel.
 * Tasks are registered with `add`, which returns a promise that resolves/rejects
 * with the task result once it is executed by the scheduler.
 */
export class PromiseScheduler {
  constructor({ concurrency = 1, autoStart = true } = {}) {
    if (concurrency <= 0) {
      throw new Error("concurrency must be greater than zero");
    }

    this.concurrency = concurrency;
    this.autoStart = autoStart;
    this.queue = [];
    this.activeCount = 0;
    this.isRunning = autoStart;
  }

  add(task) {
    if (typeof task !== "function") {
      throw new TypeError("task must be a function returning a promise");
    }

    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      if (this.isRunning) {
        this._drain();
      }
    });
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this._drain();
    }
  }

  pause() {
    this.isRunning = false;
  }

  clear() {
    while (this.queue.length) {
      const { reject } = this.queue.shift();
      reject(new Error("Task cancelled because scheduler was cleared"));
    }
  }

  _drain() {
    if (!this.isRunning) return;
    while (this.activeCount < this.concurrency && this.queue.length) {
      const { task, resolve, reject } = this.queue.shift();
      this.activeCount += 1;

      Promise.resolve()
        .then(task)
        .then(
          (result) => resolve(result),
          (error) => reject(error),
        )
        .finally(() => {
          this.activeCount -= 1;
          this._drain();
        });
    }
  }
}
