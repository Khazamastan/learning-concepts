# Testing Strategy (70/20/10)

## Ratios

- **Unit:** 70% — fast feedback on pure logic and React components.  
- **Integration:** 20% — validate module boundaries, API interactions, state management.  
- **E2E:** 10% — cover critical journeys only to keep suites lean.

## Artifact (`testing-strategy.js`)

- `testingStrategy` object records the ratios, CI gates, and risk matrix.  
- `allocateTestCases(totalCases)` projects how many tests to schedule per layer, rounding to whole cases.

## Operational Guardrails

- Enforce coverage thresholds in CI per layer (85% unit, 60% integration, 40% E2E).  
- Tag tests by layer so flakiness reviews are scoped.  
- Include contract tests in integration to catch backend schema drift.  
- Automate dashboards that track pass rates and mean time to fix per layer.

## Review Cadence

- Re-evaluate the ratio quarterly; increase integration coverage when cross-module regressions grow.  
- Feed production incidents back into test plans to ensure regressions receive automated coverage.
