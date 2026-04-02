"use strict";

const testingStrategy = {
  ratios: {
    unit: 0.7,
    integration: 0.2,
    e2e: 0.1,
  },
  gates: {
    unit: { coverageThreshold: 0.85, ciJob: "unit-tests" },
    integration: { coverageThreshold: 0.6, ciJob: "integration-tests" },
    e2e: { coverageThreshold: 0.4, ciJob: "e2e-tests" },
  },
  riskMatrix: [
    { area: "core-domain", requirement: "unit + integration" },
    { area: "critical-flows", requirement: "all three layers" },
    { area: "low-risk-ui", requirement: "unit as needed" },
  ],
};

/**
 * Compute how many test cases to target per layer given a total budget.
 *
 * @param {number} totalCases
 * @returns {{ unit: number, integration: number, e2e: number }}
 */
function allocateTestCases(totalCases) {
  if (totalCases <= 0) {
    return { unit: 0, integration: 0, e2e: 0 };
  }
  const { ratios } = testingStrategy;
  return {
    unit: Math.round(totalCases * ratios.unit),
    integration: Math.round(totalCases * ratios.integration),
    e2e: Math.round(totalCases * ratios.e2e),
  };
}

module.exports = { testingStrategy, allocateTestCases };
