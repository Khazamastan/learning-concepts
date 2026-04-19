import { useEffect, useMemo, useRef, useState } from 'react';
import './styles.css';

const PAGE_SIZE = 18;
const TOTAL_ARTICLES = 15;

const NEWS = Array.from({ length: TOTAL_ARTICLES }, (_, index) => {
  const id = index + 1;
  return {
    id,
    title: `Release ${id.toString().padStart(3, '0')}`,
    summary: `Changelog entry ${id} with performance improvements, accessibility updates, and developer ergonomics.`,
    eta: new Date(Date.now() - id * 3600 * 1000).toLocaleString()
  };
});

function fetchFeed(page) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = page * PAGE_SIZE;
      const slice = NEWS.slice(start, start + PAGE_SIZE);
      resolve({
        items: slice,
        hasMore: start + PAGE_SIZE < NEWS.length
      });
    }, 200 + Math.random() * 400);
  });
}

export default function App() {
  const [pagesLoaded, setPagesLoaded] = useState(1);
  const [items, setItems] = useState(() => NEWS.slice(0, PAGE_SIZE));
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(PAGE_SIZE < NEWS.length);
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (!hasMore) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !loading) {
          setLoading(true);
          fetchFeed(pagesLoaded).then(({ items: newItems, hasMore: stillHasMore }) => {
            setItems((prev) => [...prev, ...newItems]);
            setPagesLoaded((prev) => prev + 1);
            setHasMore(stillHasMore);
            setLoading(false);
          });
        }
      },
      {
        rootMargin: '160px'
      }
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [pagesLoaded, hasMore, loading]);

  const stats = useMemo(() => ({
    total: NEWS.length,
    rendered: items.length,
    remaining: Math.max(0, NEWS.length - items.length)
  }), [items.length]);

  return (
    <main className="feed-shell">
      <aside className="feed-info">
        <p className="eyebrow">Product timeline</p>
        <h1>Infinite Scrolling Feed</h1>
        <p className="support">
          Scroll to automatically load paginated updates. Intersection Observer ensures work happens only
          when the sentinel enters the viewport.
        </p>
        <dl className="stats">
          <div>
            <dt>Entries</dt>
            <dd>{stats.total}</dd>
          </div>
          <div>
            <dt>Loaded</dt>
            <dd>{stats.rendered}</dd>
          </div>
          <div>
            <dt>Remaining</dt>
            <dd>{stats.remaining}</dd>
          </div>
        </dl>
      </aside>
      <section className="feed" role="feed" aria-busy={loading}>
        {items.map((item) => (
          <article key={item.id} className="card" aria-posinset={item.id} aria-setsize={TOTAL_ARTICLES}>
            <header>
              <span className="label">#{item.id.toString().padStart(3, '0')}</span>
              <time dateTime={item.eta}>{item.eta}</time>
            </header>
            <h2>{item.title}</h2>
            <p>{item.summary}</p>
          </article>
        ))}
        <div ref={sentinelRef} className="sentinel" aria-hidden="true">
          {loading ? 'Loading more releases…' : hasMore ? 'Scroll for more' : 'All caught up'}
        </div>
      </section>
    </main>
  );
}
