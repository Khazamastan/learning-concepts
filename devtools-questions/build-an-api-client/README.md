# Build an API Client

Lightweight wrapper around `fetch` that standardises base URLs, default headers, request/response interceptors, and JSON handling. Includes a React playground that talks to JSONPlaceholder.

## Usage

```js
import { ApiClient } from "./apiClient";

const client = new ApiClient({ baseURL: "https://example.com/api" });
client.useRequest((config) => {
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const posts = await client.get("/posts?_limit=5");
```

## Features

- Request interceptors for auth headers, query params, or logging.
- Response interceptors for analytics or transforming payloads.
- Automatic JSON serialisation for request bodies and parsing for responses.
- Throws descriptive errors when HTTP status is not OK.

## Project layout

```
build-an-api-client/
├── index.html
├── package.json
├── src/
│   ├── ApiClientDemo.jsx
│   ├── apiClient.js
│   ├── index.jsx
│   └── styles.css
└── vite.config.js
```

## Run locally

```bash
cd build-an-api-client
npm install
npm run dev
```

Visit `http://localhost:5173` and fire sample requests (GET posts/user, POST create) to see logs and interceptors in action.
