export function tuple(...args) {
  return Object.freeze([...args]);
}
