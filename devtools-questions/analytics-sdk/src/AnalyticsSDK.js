export class AnalyticsSDK {
  constructor({ endpoint, flushInterval = 5000, fetchImpl = fetch } = {}) {
    if (!endpoint) {
      throw new Error("AnalyticsSDK requires an endpoint");
    }
    this.endpoint = endpoint;
    this.queue = [];
    this.fetchImpl = fetchImpl;
    this.timer = setInterval(() => this.flush(), flushInterval);
  }

  track(event, properties = {}) {
    this.queue.push({
      type: event,
      properties,
      timestamp: new Date().toISOString(),
    });
    if (this.queue.length >= 10) {
      this.flush();
    }
  }

  async flush() {
    if (!this.queue.length) return;
    const payload = this.queue.splice(0, this.queue.length);
    try {
      await this.fetchImpl(this.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      // push events back if network fails
      this.queue.unshift(...payload);
      console.error("Analytics flush failed", error);
    }
  }

  stop() {
    clearInterval(this.timer);
  }
}
