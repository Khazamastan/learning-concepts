"use strict";

const { onCLS, onINP, onLCP } = require("web-vitals");

/**
 * Wire up Web Vitals reporting to a custom analytics sender.
 *
 * @param {(metric: import("web-vitals").Metric) => void} send
 */
function createWebVitalsReporter(send) {
  if (typeof send !== "function") {
    throw new Error("A send callback is required");
  }

  const report = (metric) => {
    send({
      name: metric.name,
      value: metric.value,
      rating: metric.rating, // "good" | "needs-improvement" | "poor"
      delta: metric.delta,
      id: metric.id,
    });
  };

  onLCP(report);
  onINP(report);
  onCLS(report);
}

module.exports = { createWebVitalsReporter };
