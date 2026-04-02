export function throttle(fn, wait, { leading = true, trailing = true } = {}) {
  if (typeof fn !== "function") {
    throw new TypeError("throttle expects a function");
  }
  let lastCallTime = 0;
  let timeoutId = null;
  let lastArgs;
  let lastContext;

  function invoke(now) {
    lastCallTime = now;
    timeoutId = null;
    fn.apply(lastContext, lastArgs);
    lastArgs = lastContext = null;
  }

  return function throttled(...args) {
    const now = Date.now();
    if (!lastCallTime && leading === false) {
      lastCallTime = now;
    }

    const remaining = wait - (now - lastCallTime);
    lastArgs = args;
    lastContext = this;

    if (remaining <= 0 || remaining > wait) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      invoke(now);
    } else if (trailing !== false && !timeoutId) {
      timeoutId = setTimeout(() => {
        invoke(leading === false ? Date.now() : lastCallTime + wait);
      }, remaining);
    }
  };
}

function logScroll(position) {
  console.log(`scroll event at ${position}`);
}

const throttled = throttle(logScroll, 200);

let value = 0;
const interval = setInterval(() => {
  value += 20;
  if (value > 300) {
    clearInterval(interval);
  }
  throttled(value);
}, 40);
