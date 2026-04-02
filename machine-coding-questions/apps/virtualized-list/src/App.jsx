import { useMemo, useState } from 'react';
import './styles.css';

const ITEM_HEIGHT = 64;
const TOTAL_ITEMS = 5000;
const BUFFER = 5;

const DATA = Array.from({ length: TOTAL_ITEMS }, (_, index) => ({
  id: index + 1,
  title: `Row ${index + 1}`,
  detail: `Synthetic data point ${index + 1} for virtualization demo.`
}));

export default function App() {
  const [scrollTop, setScrollTop] = useState(0);
  const viewportHeight = 420;

  const { startIndex, endIndex, offset } = useMemo(() => {
    const start = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER);
    const visibleCount = Math.ceil(viewportHeight / ITEM_HEIGHT) + BUFFER * 2;
    const end = Math.min(TOTAL_ITEMS, start + visibleCount);
    return {
      startIndex: start,
      endIndex: end,
      offset: start * ITEM_HEIGHT
    };
  }, [scrollTop]);

  const items = DATA.slice(startIndex, endIndex);

  return (
    <main className="virtual-shell">
      <section className="virtual-card">
        <header>
          <p className="eyebrow">Performance</p>
          <h1>Virtualized List</h1>
          <p className="support">Render only what is visible to keep scrolling snappy.</p>
        </header>
        <div
          className="viewport"
          style={{ height: viewportHeight }}
          onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
        >
          <div className="spacer" style={{ height: TOTAL_ITEMS * ITEM_HEIGHT }}>
            <div className="inner" style={{ transform: `translateY(${offset}px)` }}>
              {items.map((item) => (
                <article key={item.id} className="row">
                  <span className="id">#{item.id}</span>
                  <div>
                    <h2>{item.title}</h2>
                    <p>{item.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
