const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

export class MyPromise {
  constructor(executor) {
    this.state = PENDING;
    this.value = undefined;
    this.handlers = [];

    const resolve = (value) => this.updateState(FULFILLED, value);
    const reject = (reason) => this.updateState(REJECTED, reason);

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  updateState(state, value) {
    if (this.state !== PENDING) return;
    if (state === FULFILLED && value instanceof MyPromise) {
      value.then((val) => this.updateState(FULFILLED, val), (err) => this.updateState(REJECTED, err));
      return;
    }
    this.state = state;
    this.value = value;
    queueMicrotask(() => {
      this.handlers.splice(0).forEach((handler) => handler());
    });
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const handle = () => {
        try {
          if (this.state === FULFILLED) {
            resolve(onFulfilled ? onFulfilled(this.value) : this.value);
          } else if (this.state === REJECTED) {
            if (onRejected) {
              resolve(onRejected(this.value));
            } else {
              reject(this.value);
            }
          }
        } catch (error) {
          reject(error);
        }
      };

      if (this.state === PENDING) {
        this.handlers.push(handle);
      } else {
        queueMicrotask(handle);
      }
    });
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  static resolve(value) {
    return new MyPromise((resolve) => resolve(value));
  }

  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }
}
