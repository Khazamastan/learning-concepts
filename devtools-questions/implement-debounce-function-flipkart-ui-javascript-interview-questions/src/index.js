export function debounce(fn, wait, { immediate = false } = {}) {
  if (typeof fn !== "function") {
    throw new TypeError("debounce expects a function");
  }
  let timeoutId = null;

  return function debounced(...args) {
    const context = this;
    const callNow = immediate && !timeoutId;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = null;
      if (!immediate) {
        fn.apply(context, args);
      }
    }, wait);

    if (callNow) {
      fn.apply(context, args);
    }
  };
}

let count = 0;

const debounced = debounce((term) => {
  count += 1;
  console.log(`searching for ${term} (queries executed: ${count})`);
}, 250);

const terms = ["re", "react", "react js", "react hooks", "react hooks guide"];
let idx = 0;
const interval = setInterval(() => {
  debounced(terms[idx]);
  idx += 1;
  if (idx === terms.length) {
    clearInterval(interval);
    setTimeout(() => debounced("react hooks guide"), 300);
  }
}, 100);
