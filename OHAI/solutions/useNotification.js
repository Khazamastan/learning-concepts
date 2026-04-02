'use strict';

const notificationCenter = (() => {
  let counter = 0;
  let queue = [];
  const listeners = new Set();

  function emit() {
    const snapshot = queue.map((notification) => ({ ...notification }));
    listeners.forEach((listener) => listener(snapshot));
  }

  function notify({ message, type = 'info', duration = 3000, metadata = {} }) {
    counter += 1;
    const notification = {
      id: `toast-${counter}`,
      message,
      type,
      duration,
      metadata,
      createdAt: Date.now(),
    };
    queue = [...queue, notification];
    emit();
    return notification.id;
  }

  function dismiss(id) {
    queue = queue.filter((notification) => notification.id !== id);
    emit();
  }

  function clear() {
    queue = [];
    emit();
  }

  function subscribe(listener) {
    listeners.add(listener);
    listener(queue.map((notification) => ({ ...notification })));
    return () => listeners.delete(listener);
  }

  function getState() {
    return queue.map((notification) => ({ ...notification }));
  }

  return { notify, dismiss, clear, subscribe, getState };
})();

function useNotification() {
  return {
    notify: notificationCenter.notify,
    dismiss: notificationCenter.dismiss,
    clear: notificationCenter.clear,
    subscribe: notificationCenter.subscribe,
    getState: notificationCenter.getState,
  };
}

const notification = useNotification();
const unsubscribe = notification.subscribe((queue) => {
  console.log('Toast queue changed:', queue);
});

const toastId = notification.notify({ message: 'Profile saved successfully', type: 'success' });

setTimeout(() => {
  notification.dismiss(toastId);
  unsubscribe();
}, 1000);

module.exports = { useNotification };
