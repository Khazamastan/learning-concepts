export function createStore(reducer, preloadedState) {
  if (typeof reducer !== "function") {
    throw new TypeError("Expected reducer to be a function");
  }

  let currentState = preloadedState;
  let listeners = [];
  let isDispatching = false;

  function getState() {
    return currentState;
  }

  function subscribe(listener) {
    if (typeof listener !== "function") {
      throw new TypeError("Expected listener to be a function");
    }
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }

  function dispatch(action) {
    if (typeof action !== "object" || action === null || typeof action.type === "undefined") {
      throw new TypeError("Actions must be plain objects with a type");
    }
    if (isDispatching) {
      throw new Error("Reducers may not dispatch actions.");
    }
    try {
      isDispatching = true;
      currentState = reducer(currentState, action);
    } finally {
      isDispatching = false;
    }
    for (const listener of listeners.slice()) {
      listener();
    }
    return action;
  }

  // populate initial state
  dispatch({ type: "@@INIT" });

  return {
    getState,
    dispatch,
    subscribe,
  };
}

// demo usage
function counter(state = 0, action) {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(counter);
store.subscribe(() => {
  console.log("State changed to", store.getState());
});

store.dispatch({ type: "increment" });
store.dispatch({ type: "increment" });
store.dispatch({ type: "decrement" });
