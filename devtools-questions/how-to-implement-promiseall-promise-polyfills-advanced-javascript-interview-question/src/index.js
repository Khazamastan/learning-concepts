export function promiseAll(iterables) {
  if (!iterables || typeof iterables[Symbol.iterator] !== "function") {
    return Promise.reject(new TypeError("promiseAll expects an iterable"));
  }

  return new Promise((resolve, reject) => {
    const results = [];
    let resolvedCount = 0;
    let index = 0;

    for (const item of iterables) {
      const currentIndex = index;
      index += 1;
      Promise.resolve(item)
        .then((value) => {
          results[currentIndex] = value;
          resolvedCount += 1;
          if (resolvedCount === index) {
            resolve(results);
          }
        })
        .catch((error) => {
          reject(error);
        });
    }

    if (index === 0) {
      resolve([]);
    }
  });
}

async function demo() {
  const movies = [
    Promise.resolve("Arrival"),
    "Dune",
    delay(100, "Blade Runner 2049"),
  ];

  const values = await promiseAll(movies);
  console.log("Resolved order preserved", values);

  try {
    await promiseAll([
      delay(50, "success"),
      Promise.reject(new Error("boom")),
      delay(10, "never"),
    ]);
  } catch (error) {
    console.log("Short-circuited on first rejection:", error.message);
  }
}

demo();

function delay(ms, value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}
