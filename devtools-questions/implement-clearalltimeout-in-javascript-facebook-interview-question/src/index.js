const activeTimers = new Set();

export function setTrackedTimeout(handler, delay, ...args) {
  const id = setTimeout(() => {
    activeTimers.delete(id);
    handler(...args);
  }, delay);
  activeTimers.add(id);
  return id;
}

export function clearTrackedTimeout(id) {
  clearTimeout(id);
  activeTimers.delete(id);
}

export function clearAllTimeout() {
  for (const id of activeTimers) {
    clearTimeout(id);
  }
  activeTimers.clear();
}

const id1 = setTrackedTimeout(() => console.log('first'), 200);
const id2 = setTrackedTimeout(() => console.log('second'), 400);
setTrackedTimeout(() => console.log('third'), 600);

setTimeout(() => {
  console.log('clearing all timeouts');
  clearAllTimeout();
  clearTrackedTimeout(id1);
  clearTrackedTimeout(id2);
}, 250);
