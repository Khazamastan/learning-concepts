import { useMemo, useState } from "react";

const DEFAULT_STRATEGY = {
  ratios: {
    unit: 0.7,
    integration: 0.2,
    e2e: 0.1,
  },
};

export default function TestingStrategyDashboard19({ strategy = DEFAULT_STRATEGY }) {
  const [total, setTotal] = useState(100);

  const allocation = useMemo(() => {
    const { unit, integration, e2e } = strategy.ratios;
    const clamp = (value) => Math.max(0, Math.round(value));
    return {
      unit: clamp(total * unit),
      integration: clamp(total * integration),
      e2e: clamp(total * e2e),
    };
  }, [strategy, total]);

  return (
    <section>
      <h2>Testing Strategy Dashboard (React 19)</h2>
      <label>
        Total planned test cases
        <input
          type="number"
          min="0"
          value={total}
          onChange={(event) => setTotal(Number(event.target.value))}
          style={{ marginLeft: 8 }}
        />
      </label>
      <ul style={{ marginTop: 12 }}>
        <li>
          Unit: <strong>{allocation.unit}</strong>
        </li>
        <li>
          Integration: <strong>{allocation.integration}</strong>
        </li>
        <li>
          E2E: <strong>{allocation.e2e}</strong>
        </li>
      </ul>
    </section>
  );
}
