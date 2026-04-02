/**
 * listenTo(element, type, [selector], handler, [options])
 *
 * Small event delegation helper inspired by jQuery's .on. Supports two signatures:
 *
 * 1. listenTo(el, "click", handler)
 * 2. listenTo(el, "click", ".selector", handler, options)
 *
 * Returns an unsubscribe function that removes the listener.
 */
export function listenTo(element, type, selectorOrHandler, handlerOrOptions, options) {
  if (!element || !element.addEventListener) {
    throw new TypeError("listenTo expects a DOM element with addEventListener");
  }
  if (typeof type !== "string") {
    throw new TypeError("Event type must be a string");
  }

  let selector = null;
  let handler = null;
  let listenerOptions = options ?? false;

  if (typeof selectorOrHandler === "function") {
    handler = selectorOrHandler;
    listenerOptions = handlerOrOptions ?? false;
  } else {
    selector = selectorOrHandler;
    handler = handlerOrOptions;
  }

  if (typeof handler !== "function") {
    throw new TypeError("Event handler must be a function");
  }

  const listener = (event) => {
    if (!selector) {
      handler.call(event.target, event);
      return;
    }

    const match = event.target.closest(selector);
    if (match && element.contains(match)) {
      handler.call(match, event);
    }
  };

  element.addEventListener(type, listener, listenerOptions);

  return function unsubscribe() {
    element.removeEventListener(type, listener, listenerOptions);
  };
}
