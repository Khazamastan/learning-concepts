# React 19 Practice Components

This directory mirrors the standalone Node.js examples with interactive React 19 components. Each component exposes a small demo UI that you can embed in any React application (Next.js 15 / Vite / CRA).

## File Overview

- `CopyTechniques.jsx` – shallow vs deep copy state visualizer.
- `GroupAnagrams.jsx` – comma-separated input grouped by anagram signature.
- `FilterPolyfill.jsx` – compares native `Array.prototype.filter` with a polyfill.
- `ObjectDestructuring.jsx` – renders destructured user data.
- `ProcessLogsMaxSpan.jsx` – parses login/logout logs with a configurable span.
- `ProcessLargeFileDownload.jsx` – client-side download trigger for REST endpoints.
- `NimSum.jsx` – Nim heap analyzer.
- `StringToInteger.jsx` – “atoi” style parser playground.
- `StringPermutations.jsx` – deduplicated permutation generator.
- `LongestSubstringNoRepeat.jsx` – sliding-window substring inspector.
- `PreviousIndexOccurrence.jsx` – traces previous indices across two arrays.
- `StringSubsets.jsx` – powerset explorer.
- `UseNotification.jsx` – centralized toast provider + demo hook usage.
- `DemoApp.jsx` – convenience wrapper composing every demo (wraps children with `NotificationProvider`).

## Using the Components

1. Install dependencies (React 19 RC or newer + bundler of choice). Example using Vite:
   ```bash
   npm create vite@latest react-19-playground -- --template react-swc
   cd react-19-playground
   npm install
   ```
2. Copy the JSX files from this folder into your project (e.g., place them in `src/examples/`).
3. Update your app entry point to render the desired demos. For a full showcase:
   ```jsx
   import React from 'react';
   import ReactDOM from 'react-dom/client';
   import { DemoApp } from './examples/DemoApp.jsx';

   ReactDOM.createRoot(document.getElementById('root')).render(
     <React.StrictMode>
       <DemoApp />
     </React.StrictMode>,
   );
   ```
4. Start your dev server (`npm run dev`) and explore the interactive examples.

### Next.js App Router (React 19)
- Move the files into `app/examples/` (mark client components with `'use client';` – already included).
- Import the specific demo inside a page or route segment: `import { StringPermutationsDemo } from '@/examples/StringPermutations.jsx';`
- Wrap pages that need toasts with `NotificationProvider` from `UseNotification.jsx`.

## Notes

- Each demo keeps state local and intentionally avoids external dependencies.
- `ProcessLargeFileDownload.jsx` assumes a backend endpoint like `GET /downloads/:fileName` that streams large files; the component simply streams the response to a browser download.
- `UseNotification.jsx` exposes both a provider and a `useNotification` hook so you can integrate the centralized toast queue with your own UI components.
