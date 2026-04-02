const isString = (value) => typeof value === 'string';

export class MemoryStorage {
  #store = new Map();

  get length() {
    return this.#store.size;
  }

  clear() {
    this.#store.clear();
  }

  getItem(key) {
    if (!isString(key)) {
      throw new TypeError('Key must be a string');
    }
    return this.#store.has(key) ? this.#store.get(key) : null;
  }

  key(index) {
    const keys = Array.from(this.#store.keys());
    return keys[index] ?? null;
  }

  removeItem(key) {
    if (!isString(key)) {
      throw new TypeError('Key must be a string');
    }
    this.#store.delete(key);
  }

  setItem(key, value) {
    if (!isString(key)) {
      throw new TypeError('Key must be a string');
    }
    this.#store.set(key, String(value));
  }
}

export const storage = typeof window !== 'undefined' && window.localStorage
  ? window.localStorage
  : new MemoryStorage();
