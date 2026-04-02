const results = [];

export function test(name, fn, timeout = 2000) {
  const entry = { name, status: "pending", error: null, duration: 0 };
  results.push(entry);

  const start = Date.now();
  const maybePromise = (async () => fn())();

  const timer = setTimeout(() => {
    entry.status = "failed";
    entry.error = new Error(`Test timed out after ${timeout}ms`);
    report();
  }, timeout);

  maybePromise
    .then(() => {
      if (entry.status === "pending") {
        entry.status = "passed";
        entry.duration = Date.now() - start;
      }
    })
    .catch((error) => {
      entry.status = "failed";
      entry.error = error;
      entry.duration = Date.now() - start;
    })
    .finally(() => {
      clearTimeout(timer);
      report();
    });
}

export function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`Expected ${actual} to be ${expected}`);
      }
    },
    toEqual(expected) {
      const pass = deepEqual(actual, expected);
      if (!pass) {
        throw new Error(`Expected ${JSON.stringify(actual)} to deeply equal ${JSON.stringify(expected)}`);
      }
    },
    toThrow(expectedMessage) {
      if (typeof actual !== "function") {
        throw new Error("expect(...).toThrow() requires a function");
      }
      let thrown = false;
      let message = "";
      try {
        actual();
      } catch (error) {
        thrown = true;
        message = error instanceof Error ? error.message : String(error);
      }
      if (!thrown) {
        throw new Error("Expected function to throw");
      }
      if (expectedMessage && !message.includes(expectedMessage)) {
        throw new Error(`Expected error message to include \\"${expectedMessage}\\" but got \\"${message}\\"`);
      }
    },
  };
}

function deepEqual(a, b) {
  if (Object.is(a, b)) return true;
  if (typeof a !== typeof b) return false;
  if (typeof a !== "object" || a === null || b === null) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key) || !deepEqual(a[key], b[key])) {
      return false;
    }
  }

  return true;
}

function report() {
  if (results.some((entry) => entry.status === "pending")) {
    return;
  }

  const summary = results.reduce(
    (acc, entry) => {
      if (entry.status === "passed") acc.passed += 1;
      else acc.failed += 1;
      return acc;
    },
    { passed: 0, failed: 0 },
  );

  console.log("\nTest run summary");
  console.log("================");
  for (const entry of results) {
    if (entry.status === "passed") {
      console.log(`✅ ${entry.name} (${entry.duration}ms)`);
    } else {
      console.error(`❌ ${entry.name}`);
      if (entry.error) {
        console.error("   " + entry.error.message);
      }
    }
  }
  console.log(`\nPassed: ${summary.passed}, Failed: ${summary.failed}`);
}

// demo
function add(a, b) {
  return a + b;
}

function failingOperation() {
  throw new Error("Kaboom");
}

test("adds numbers", () => {
  expect(add(2, 3)).toBe(5);
  expect(add(-1, 4)).toBe(3);
});

test("deep equals objects", () => {
  expect({ foo: { bar: [1, 2, 3] } }).toEqual({ foo: { bar: [1, 2, 3] } });
});

test("throws errors", () => {
  expect(failingOperation).toThrow("Kaboom");
});

test("async assertions", async () => {
  const value = await Promise.resolve(42);
  expect(value).toBe(42);
});
