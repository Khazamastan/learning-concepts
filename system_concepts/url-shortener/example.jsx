import { useMemo, useState } from "react";

const alphabet =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export default function UrlShortenerDemo() {
  const store = useMemo(() => new Map(), []);
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [entries, setEntries] = useState([]);

  function base62Token() {
    let token = "";
    for (let i = 0; i < 6; i += 1) {
      const idx = Math.floor(Math.random() * alphabet.length);
      token += alphabet[idx];
    }
    return token;
  }

  function handleShorten(event) {
    event.preventDefault();
    if (!longUrl) return;
    let token = base62Token();
    while (store.has(token)) token = base62Token();
    store.set(token, longUrl);
    const url = `${window.location.origin}/r/${token}`;
    setShortUrl(url);
    setEntries((current) => [{ token, longUrl }, ...current]);
    setLongUrl("");
  }

  return (
    <section className="panel">
      <h2>URL Shortener Simulator</h2>
      <form onSubmit={handleShorten} className="form-grid">
        <label htmlFor="url-input">Long URL</label>
        <input
          id="url-input"
          type="url"
          required
          placeholder="https://example.com/docs"
          value={longUrl}
          onChange={(event) => setLongUrl(event.target.value)}
        />
        <button type="submit">Generate Token</button>
      </form>
      {shortUrl && (
        <p>
          Short URL:{" "}
          <a href={shortUrl} onClick={(event) => event.preventDefault()}>
            {shortUrl}
          </a>
        </p>
      )}
      <h3>Recent Mappings</h3>
      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Long URL</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(({ token, longUrl }) => (
            <tr key={token}>
              <td>
                <code>{token}</code>
              </td>
              <td className="wrap">{longUrl}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
