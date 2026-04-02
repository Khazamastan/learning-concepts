import { useMemo, useState } from 'react';
import './styles.css';

const ITEMS = Array.from({ length: 42 }, (_, index) => ({
  id: index + 1,
  title: `Design Doc ${index + 1}`,
  owner: ['Ada', 'Grace', 'Linus', 'Margaret'][index % 4],
}));

const PAGE_SIZES = [5, 10, 15];

export default function App() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

  const totalPages = Math.ceil(ITEMS.length / pageSize);

  const currentItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return ITEMS.slice(start, start + pageSize);
  }, [page, pageSize]);

  const goToPage = (nextPage) => {
    setPage(Math.max(1, Math.min(totalPages, nextPage)));
  };

  return (
    <main className="pagination-demo">
      <header>
        <h1>Pagination Component</h1>
        <p>Select page size and navigate through the collection.</p>
      </header>

      <div className="pagination-demo__controls">
        <label>
          Page size
          <select
            value={pageSize}
            onChange={(event) => {
              setPageSize(Number(event.target.value));
              setPage(1);
            }}
          >
            {PAGE_SIZES.map((size) => (
              <option key={size} value={size}>
                {size} items
              </option>
            ))}
          </select>
        </label>
        <span>
          Showing {(page - 1) * pageSize + 1}-
          {Math.min(page * pageSize, ITEMS.length)} of {ITEMS.length}
        </span>
      </div>

      <section className="pagination-demo__list">
        {currentItems.map((item) => (
          <article key={item.id}>
            <h2>{item.title}</h2>
            <p>Owner: {item.owner}</p>
          </article>
        ))}
      </section>

      <nav className="pagination-demo__nav">
        <button type="button" onClick={() => goToPage(page - 1)} disabled={page === 1}>
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
          <button
            key={number}
            type="button"
            className={number === page ? 'is-active' : ''}
            onClick={() => setPage(number)}
          >
            {number}
          </button>
        ))}
        <button
          type="button"
          onClick={() => goToPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </nav>
    </main>
  );
}
