"use strict";

const registry = new Map();

/**
 * Register a micro-frontend with a lazy loader function.
 *
 * @param {string} name
 * @param {() => Promise<{ mount: Function, unmount?: Function }>} loader
 */
function registerMicroFrontend(name, loader) {
  if (!name || typeof loader !== "function") {
    throw new Error("name and loader are required to register a micro-frontend");
  }
  registry.set(name, loader);
}

/**
 * Load and mount a micro-frontend into the provided DOM container.
 *
 * @param {string} name
 * @param {HTMLElement} container
 * @param {object} props
 * @returns {Promise<() => void>} cleanup callback
 */
async function mountMicroFrontend(name, container, props = {}) {
  if (!registry.has(name)) {
    throw new Error(`Micro-frontend "${name}" is not registered`);
  }
  const loader = registry.get(name);
  const module = await loader();
  if (typeof module.mount !== "function") {
    throw new Error(`Micro-frontend "${name}" must expose a mount function`);
  }
  const cleanup = module.mount(container, props);
  return typeof cleanup === "function" ? cleanup : module.unmount || (() => {});
}

/**
 * Remove a registration (e.g., during hot swaps).
 *
 * @param {string} name
 */
function unregisterMicroFrontend(name) {
  registry.delete(name);
}

module.exports = {
  registerMicroFrontend,
  mountMicroFrontend,
  unregisterMicroFrontend,
};
