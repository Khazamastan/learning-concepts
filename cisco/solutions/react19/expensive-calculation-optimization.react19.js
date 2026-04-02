// React 19 compatible version
'use client';

import React, { Suspense, memo, use, useCallback, useMemo, useState } from 'react';

const ExpensiveCalculationComponent = memo(function ExpensiveCalculationComponent({ dataResource, onProcess }) {
  console.log('ExpensiveCalculationComponent rendered');

  const numbers = use(dataResource);

  const result = useMemo(() => numbers.reduce((acc, num) => acc + num * 2, 0), [numbers]);

  return (
    <div>
      <p>Calculated Result: {result}</p>
      <button type="button" onClick={onProcess}>
        Process Data
      </button>
    </div>
  );
});

export default function ParentComponent() {
  const [count, setCount] = useState(0);
  const numbersResource = useMemo(() => Promise.resolve([1, 2, 3, 4, 5]), []);

  const handleProcessData = useCallback(() => {
    console.log('Processing data...');
  }, []);

  const handleIncrement = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const memoizedData = useMemo(() => calculateTotal(numbers), [numbers]);

  return (
    <div>
      <h1>Parent Component (React 19)</h1>
      <p>Count: {count}</p>
      <button type="button" onClick={handleIncrement}>
        Increment
      </button>
      <Suspense fallback={<p>Calculating…</p>}>
        <ExpensiveCalculationComponent dataResource={numbersResource} onProcess={handleProcessData} />
      </Suspense>
    </div>
  );
}
