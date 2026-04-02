# React 19 System Design Example Browser

This experimental React setup (React 19 RC APIs) lets you browse and execute the system-design snippets in a browser UI. It reuses the server-side snippet registry and exposes a hook plus a client component.

## Prerequisites

- Node.js 18+ (19+ preferred)
- React 19 release candidate or newer. The snippets use `use`-less hooks and should remain forward-compatible.

## Files

- `examplesClient.tsx` – registers every snippet module and exports helper utilities (`exampleKeys`, `runExample`, `getUseCase`).
- `ExamplesApp.tsx` – a client component showcasing how to render a list of examples and run them with JSON-encoded arguments.

## Usage

1. Copy the `examples/react` folder into your Next.js (or Vite + React 19) project.
2. Update import paths if your folder structure differs.
3. Add a route or page that renders `<ExamplesApp />`.
4. Ensure your bundler transpiles the CommonJS snippet modules; in Next.js App Router, you can place them under `app/(...)` and mark the component `'use client';` as shown.

## Customization

- Style the UI with your preferred design system instead of inline styles.
- Replace the JSON args input with form controls that match each example's expected parameters.
- Extend `examplesClient.tsx` with TypeScript types for stricter argument validation.
