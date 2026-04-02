'use client';

import { useMemo, useState } from 'react';
import { exampleKeys, runExample, getUseCase } from './examplesClient';

export function ExamplesApp() {
  const [selected, setSelected] = useState<string | null>(null);
  const [args, setArgs] = useState('');

  const result = useMemo(() => {
    if (!selected) return null;
    try {
      const parsedArgs = args.trim() ? JSON.parse(`[${args}]`) : [];
      return runExample(selected, ...(parsedArgs as unknown[]));
    } catch (err) {
      return err instanceof Error ? `Error: ${err.message}` : String(err);
    }
  }, [selected, args]);

  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
      <section style={{ minWidth: '18rem' }}>
        <h2>Examples ({exampleKeys.length})</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, maxHeight: '60vh', overflow: 'auto' }}>
          {exampleKeys.map(key => (
            <li key={key} style={{ marginBottom: '0.5rem' }}>
              <button
                type="button"
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.5rem',
                  borderRadius: '0.5rem',
                  border: key === selected ? '2px solid #2563eb' : '1px solid #cbd5f5',
                  background: key === selected ? '#dbeafe' : '#fff',
                }}
                onClick={() => setSelected(key)}
              >
                <strong>{key}</strong>
                <div style={{ fontSize: '0.8rem', color: '#475569' }}>{getUseCase(key)}</div>
              </button>
            </li>
          ))}
        </ul>
      </section>
      <section style={{ flex: 1 }}>
        <h2>Runner</h2>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          JSON args (comma separated):
          <input
            type="text"
            value={args}
            onChange={event => setArgs(event.target.value)}
            placeholder='e.g. "product-123", { "price": 42 }'
            style={{ width: '100%', marginTop: '0.25rem' }}
          />
        </label>
        <div style={{
          minHeight: '12rem',
          border: '1px solid #cbd5f5',
          borderRadius: '0.5rem',
          padding: '1rem',
          background: '#f8fafc',
          whiteSpace: 'pre-wrap',
          fontFamily: 'monospace',
        }}>
          {selected ? JSON.stringify(result, null, 2) : 'Select an example to run.'}
        </div>
      </section>
    </div>
  );
}

export default ExamplesApp;
