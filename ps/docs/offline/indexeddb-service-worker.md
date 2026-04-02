# Offline Caching with IndexedDB + Service Workers

## Architecture
1. **Service Worker Cache** – Stores static shell assets and API responses for GET requests.
2. **IndexedDB** – Persists structured data (e.g., JSON records, session state) for offline reads and background sync.

## Service Worker Example
```js
const STATIC_CACHE = 'static-v1';
const DATA_CACHE = 'data-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(['/index.html', '/offline.html', '/styles.css']))
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(DATA_CACHE).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match('/offline.html'));
    })
  );
});
```

## IndexedDB Helper
```js
import { openDB } from 'idb';

export async function savePokemon(pokemon) {
  const db = await openDB('pokemon-db', 1, {
    upgrade(upgradeDb) {
      upgradeDb.createObjectStore('pokemon', { keyPath: 'id' });
    }
  });
  const tx = db.transaction('pokemon', 'readwrite');
  await tx.store.put(pokemon);
  await tx.done;
}
```

## Best Practices
- Version caches to avoid stale assets; clear old versions in the `activate` event.
- Use Background Sync or periodic sync to push offline mutations when connectivity returns.
- Serve an offline fallback shell (`/offline.html`) with minimal UI and cached data snapshots.
- Monitor storage usage; delete least-recently used entries when thresholds are reached.
