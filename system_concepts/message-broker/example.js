// Async message broker demonstration using Node.js EventEmitter.
const { EventEmitter } = require('events');

class Broker extends EventEmitter {
  constructor() {
    super();
    this.queues = new Map();
  }

  subscribe(topic, handler) {
    if (!this.queues.has(topic)) {
      this.queues.set(topic, []);
    }
    const wrapper = (message) => handler(message);
    this.on(topic, wrapper);
    return () => this.off(topic, wrapper);
  }

  publish(topic, payload) {
    const message = { id: cryptoId(), topic, payload, ts: Date.now() };
    const hasListeners = this.listenerCount(topic) > 0;
    if (!hasListeners) {
      console.log(`[Broker] No subscribers for '${topic}', dropping ${message.id}`);
      return;
    }
    this.emit(topic, message);
    console.log(`[Broker] Delivered ${message.id} to topic '${topic}'`);
  }
}

function cryptoId() {
  return Math.random().toString(36).slice(2, 10);
}

async function consumer(name, topic, broker) {
  const unsubscribe = broker.subscribe(topic, async (message) => {
    console.log(`[Consumer:${name}] Received ${message.topic}#${message.id}`, message.payload);
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 400 + 100));
    console.log(`[Consumer:${name}] Acknowledged ${message.id}`);
  });
  return unsubscribe;
}

async function producer(name, topic, broker, intervalMs) {
  let counter = 1;
  const timer = setInterval(() => {
    broker.publish(topic, { producer: name, sequence: counter });
    counter += 1;
  }, intervalMs);
  return () => clearInterval(timer);
}

async function main() {
  const broker = new Broker();

  const unsubscribeOrders = await consumer('orders-service', 'orders', broker);
  const unsubscribeAnalytics = await consumer('analytics', 'orders', broker);
  const unsubscribeAlerts = await consumer('notifications', 'alerts', broker);

  const stopCheckout = await producer('checkout', 'orders', broker, 700);
  const stopFraud = await producer('fraud', 'alerts', broker, 2000);

  await new Promise((resolve) => setTimeout(resolve, 6000));

  stopCheckout();
  stopFraud();
  unsubscribeOrders();
  unsubscribeAnalytics();
  unsubscribeAlerts();
  console.log('Demo finished.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
