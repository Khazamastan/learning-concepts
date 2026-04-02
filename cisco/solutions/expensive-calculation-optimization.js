import React, { useCallback, useMemo, useState } from 'react';

const ExpensiveCalculationComponent = React.memo(function ExpensiveCalculationComponent({
  data,
  onProcess,
}) {
  console.log('ExpensiveCalculationComponent rendered');

  const result = useMemo(() => data.reduce((acc, num) => acc + num * 2, 0), [data]);

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
  const [numbers] = useState([1, 2, 3, 4, 5]);

  const handleProcessData = useCallback(() => {
    console.log('Processing data...');
  }, []);

  const handleIncrement = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div>
      <h1>Parent Component</h1>
      <p>Count: {count}</p>
      <button type="button" onClick={handleIncrement}>
        Increment
      </button>
      <ExpensiveCalculationComponent data={numbers} onProcess={handleProcessData} />
    </div>
  );
}
