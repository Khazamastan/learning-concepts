# React 19 Concept Explorer

This Vite-powered React 19 playground mirrors every backend concept with a client-side visualization. It uses the React 19 `use()` hook to
lazy-load one concept at a time, keeping bundles small and demonstrating code-splitting in practice.

## Prerequisites
- Node.js 20+
- npm 10+

## Install & Run
```bash
cd react-examples
npm install
npm run dev
```
Visit http://localhost:5173 to browse the concepts. Each tile links back to the corresponding Node example (e.g. `http-protocols/example`).

## Build for production
```bash
npm run build
npm run preview # optional local preview
```

The compiled output in `dist/` is suitable for serving from any static host or CDN.

## Folder Structure
- `src/concepts` — Twenty React components, one per topic. They reference the Node demos and highlight key takeaways.
- `src/App.jsx` — Uses Suspense + `use()` for React 19 streaming dynamic imports.
- `tailwind.config.js` — Tailwind utility styling; tweak to align with your design system.

## Further Ideas
- Wire up live metrics by calling the Node samples from React components.
- Add charts (e.g. using Recharts) to visualize performance data pulled from the demos.
- Convert to a Next.js 15 app to explore React Server Components alongside these client examples.
