import { useMemo, useState } from 'react';
import './styles.css';

const GIFS = [
  {
    id: 'celebrate',
    title: 'Celebration Loop',
    url: 'https://media.giphy.com/media/l4KhQo2MESJkc6QbS/giphy.gif',
    tags: ['success', 'party', 'fun']
  },
  {
    id: 'coffee',
    title: 'Morning Coffee',
    url: 'https://media.giphy.com/media/ICOgUNjpvO0PC/giphy.gif',
    tags: ['coffee', 'morning', 'routine']
  },
  {
    id: 'coding',
    title: 'Late Night Coding',
    url: 'https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif',
    tags: ['code', 'developer', 'focus']
  },
  {
    id: 'thumbs-up',
    title: 'Thumbs Up',
    url: 'https://media.giphy.com/media/111ebonMs90YLu/giphy.gif',
    tags: ['approval', 'ack', 'good job']
  }
];

export default function App() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const lower = query.toLowerCase();
    return GIFS.filter(
      (item) =>
        item.title.toLowerCase().includes(lower) ||
        item.tags.some((tag) => tag.includes(lower))
    );
  }, [query]);

  return (
    <main className="gif-search">
      <header>
        <h1>GIF Search</h1>
        <p>Search a curated set of reaction GIFs without hitting an external API.</p>
        <input
          type="search"
          placeholder="Search by keyword…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </header>
      <section className="gif-search__grid">
        {filtered.map((gif) => (
          <figure key={gif.id}>
            <img src={gif.url} alt={gif.title} loading="lazy" />
            <figcaption>{gif.title}</figcaption>
          </figure>
        ))}
        {!filtered.length && <p className="gif-search__empty">No GIFs matched your search.</p>}
      </section>
    </main>
  );
}
