import React, { useEffect, useMemo, useRef, useState } from 'react';

/**
 * Problem #58: Capture product visible on viewport when user stops scrolling - Reactjs
 *
 * Detailed Problem Statement:
 * In React, report visible product cards after scroll idle.
 *
 * Example Input:
 * products = [{ id: 'p1' }, { id: 'p2' }]
 *
 * Example Output:
 * ['p1']
 */

export const problem = 'Capture product visible on viewport when user stops scrolling - Reactjs';

export const statement = `
In React, report visible product cards after scroll idle.
`.trim();

export const exampleInput = `
products = [{ id: 'p1' }, { id: 'p2' }]
`.trim();

export const exampleOutput = `
['p1']
`.trim();

function isVisible(el) {
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

// Approach 1: Scroll-stop debounce + DOM measurement
export function ProductVisibilitySolution1({ products }) {
  const refs = useRef(new Map());
  const [visibleIds, setVisibleIds] = useState([]);

  useEffect(() => {
    let timer = null;

    const onScroll = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const next = [];
        for (const [id, el] of refs.current.entries()) {
          if (isVisible(el)) next.push(id);
        }
        setVisibleIds(next);
      }, 180);
    };

    window.addEventListener('scroll', onScroll);
    onScroll();

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section>
      <p>Visible: {visibleIds.join(', ') || 'None'}</p>
      <div style={{ display: 'grid', gap: 16 }}>
        {products.map((p) => (
          <article
            key={p.id}
            ref={(el) => {
              if (el) refs.current.set(p.id, el);
            }}
            style={{ minHeight: 180, border: '1px solid #ddd', padding: 12 }}
          >
            <h4>{p.name || p.id}</h4>
            <p>Product card: {p.id}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

// Approach 2: IntersectionObserver + scroll idle confirmation
export function ProductVisibilitySolution2({ products }) {
  const nodes = useRef(new Map());
  const active = useRef(new Set());
  const [visibleIds, setVisibleIds] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.getAttribute('data-id');
          if (!id) continue;
          if (entry.isIntersecting) active.current.add(id);
          else active.current.delete(id);
        }
      },
      { threshold: 0.1 }
    );

    for (const el of nodes.current.values()) observer.observe(el);

    let timer = null;
    const onScroll = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        setVisibleIds(Array.from(active.current));
      }, 180);
    };

    window.addEventListener('scroll', onScroll);
    onScroll();

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <section>
      <p>Visible (Observer): {visibleIds.join(', ') || 'None'}</p>
      {products.map((p) => (
        <div
          key={p.id}
          data-id={p.id}
          ref={(el) => {
            if (el) nodes.current.set(p.id, el);
          }}
          style={{ minHeight: 160, border: '1px dashed #bbb', marginBottom: 12, padding: 12 }}
        >
          {p.name || p.id}
        </div>
      ))}
    </section>
  );
}

// Approach 3: Reusable hook + UI layer
export function useVisibleProducts(products, wait = 160) {
  const refs = useRef(new Map());
  const [visibleIds, setVisibleIds] = useState([]);

  useEffect(() => {
    let timer = null;

    const update = () => {
      const next = products
        .map((p) => p.id)
        .filter((id) => isVisible(refs.current.get(id)));
      setVisibleIds(next);
    };

    const onScroll = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(update, wait);
    };

    window.addEventListener('scroll', onScroll);
    update();

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, [products, wait]);

  const bind = useMemo(
    () => (id) => (el) => {
      if (el) refs.current.set(id, el);
    },
    []
  );

  return { visibleIds, bind };
}

export function ProductVisibilitySolution3({ products }) {
  const { visibleIds, bind } = useVisibleProducts(products);

  return (
    <section>
      <strong>Visible via Hook: {visibleIds.join(', ') || 'None'}</strong>
      {products.map((p) => (
        <div key={p.id} ref={bind(p.id)} style={{ minHeight: 150, border: '1px solid #ddd', marginTop: 10 }}>
          {p.name || p.id}
        </div>
      ))}
    </section>
  );
}

export default ProductVisibilitySolution1;
