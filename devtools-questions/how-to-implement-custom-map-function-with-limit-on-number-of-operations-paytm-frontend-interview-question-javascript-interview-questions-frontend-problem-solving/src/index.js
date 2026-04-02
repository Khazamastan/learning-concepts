export async function mapWithLimit(iterable, limit, mapper) {
  if (!Array.isArray(iterable)) {
    throw new TypeError("First argument must be an array");
  }
  if (typeof mapper !== "function") {
    throw new TypeError("Mapper must be a function");
  }
  if (!Number.isInteger(limit) || limit < 1) {
    throw new RangeError("Limit must be a positive integer");
  }

  const result = new Array(iterable.length);
  let inFlight = 0;
  let index = 0;

  return new Promise((resolve, reject) => {
    const queueNext = () => {
      if (index >= iterable.length && inFlight === 0) {
        resolve(result);
        return;
      }

      while (inFlight < limit && index < iterable.length) {
        const currentIndex = index++;
        inFlight += 1;
        Promise.resolve()
          .then(() => mapper(iterable[currentIndex], currentIndex, iterable))
          .then((value) => {
            result[currentIndex] = value;
          })
          .catch(reject)
          .finally(() => {
            inFlight -= 1;
            queueNext();
          });
      }
    };

    queueNext();
  });
}

// demo usage
async function demo() {
  const tasks = [100, 50, 150, 25, 10].map((ms, idx) => ({ delay: ms, value: idx + 1 }));
  const started = [];
  const finished = [];

  const output = await mapWithLimit(tasks, 2, async (task) => {
    started.push(`start-${task.value}`);
    await new Promise((resolve) => setTimeout(resolve, task.delay));
    finished.push(`done-${task.value}`);
    return task.value * 10;
  });

  console.log("Input order preserved:", output);
  console.log("Start order:", started.join(", "));
  console.log("Finish order:", finished.join(", "));
}

demo().catch((error) => {
  console.error("mapWithLimit demo failed", error);
});
