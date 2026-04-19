import React, { useMemo, useState } from 'react';

/**
 * Problem #64: Pagination component
 *
 * Detailed Problem Statement:
 * Create pagination UI showing current page, next/prev, and visible page range.
 *
 * Example Input:
 * totalItems=95, perPage=10, current=5
 *
 * Example Output:
 * Pages: 1 ... 4 5 6 ... 10
 */

export const problem = 'Pagination component';

export const statement = `
Create pagination UI showing current page, next/prev, and visible page range.
`.trim();

export const exampleInput = `
totalItems=95, perPage=10, current=5
`.trim();

export const exampleOutput = `
Pages: 1 ... 4 5 6 ... 10
`.trim();

export function buildPagination(totalItems, perPage, current) {
  const totalPages = Math.ceil(totalItems / perPage);
  const pages = [];

  for (let p = 1; p <= totalPages; p += 1) {
    if (p === 1 || p === totalPages || Math.abs(p - current) <= 1) pages.push(p);
  }

  const compact = [];
  for (let i = 0; i < pages.length; i += 1) {
    if (i > 0 && pages[i] !== pages[i - 1] + 1) compact.push('...');
    compact.push(pages[i]);
  }

  return { totalPages, pages: compact };
}

// Approach 1: Basic pagination controls
export function PaginationSolution1({ totalItems = 95, perPage = 10 }) {
  const [current, setCurrent] = useState(5);
  const model = useMemo(() => buildPagination(totalItems, perPage, current), [totalItems, perPage, current]);

  return (
    <section>
      <p>
        Page {current} of {model.totalPages}
      </p>
      <button onClick={() => setCurrent((c) => Math.max(1, c - 1))} disabled={current === 1}>
        Prev
      </button>

      {model.pages.map((item, idx) =>
        item === '...' ? (
          <span key={`dots-${idx}`} style={{ margin: '0 6px' }}>
            ...
          </span>
        ) : (
          <button
            key={item}
            onClick={() => setCurrent(item)}
            style={{ marginInline: 4, fontWeight: item === current ? 700 : 400 }}
          >
            {item}
          </button>
        )
      )}

      <button onClick={() => setCurrent((c) => Math.min(model.totalPages, c + 1))} disabled={current === model.totalPages}>
        Next
      </button>
    </section>
  );
}

// Approach 2: Pagination + page-size selector
export function PaginationSolution2({ totalItems = 220 }) {
  const [perPage, setPerPage] = useState(20);
  const [current, setCurrent] = useState(1);
  const model = useMemo(() => buildPagination(totalItems, perPage, current), [totalItems, perPage, current]);

  return (
    <section>
      <label>
        Page Size:
        <select
          value={perPage}
          onChange={(e) => {
            setPerPage(Number(e.target.value));
            setCurrent(1);
          }}
          style={{ marginLeft: 8 }}
        >
          {[10, 20, 50].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </label>

      <div style={{ marginTop: 10 }}>
        {model.pages.map((item, idx) =>
          item === '...' ? (
            <span key={idx}> ... </span>
          ) : (
            <button key={item} onClick={() => setCurrent(item)}>
              {item}
            </button>
          )
        )}
      </div>
    </section>
  );
}

// Approach 3: Controlled pagination component
export function PaginationSolution3({ totalItems = 180, perPage = 15, value = 1, onChange }) {
  const model = useMemo(() => buildPagination(totalItems, perPage, value), [totalItems, perPage, value]);

  return (
    <nav aria-label="Pagination">
      <button onClick={() => onChange?.(Math.max(1, value - 1))} disabled={value <= 1}>
        Prev
      </button>
      {model.pages.map((item, idx) =>
        item === '...' ? (
          <span key={idx} style={{ marginInline: 6 }}>
            ...
          </span>
        ) : (
          <button key={item} onClick={() => onChange?.(item)} aria-current={item === value ? 'page' : undefined}>
            {item}
          </button>
        )
      )}
      <button onClick={() => onChange?.(Math.min(model.totalPages, value + 1))} disabled={value >= model.totalPages}>
        Next
      </button>
    </nav>
  );
}

export default PaginationSolution1;
