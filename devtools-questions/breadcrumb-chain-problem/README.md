# Breadcrumb Chain Problem

Given a list of nodes (id, label, parentId) and a target leaf, reconstruct the breadcrumb trail up to the root. Handles unordered input, cycle detection, and missing parents.

## Algorithm

1. Index nodes by `id` using a `Map` for O(1) lookups.
2. Walk upwards from the target node via `parentId`, unshifting nodes into the breadcrumb list.
3. Track visited ids to detect cycles and throw informative errors.
4. Halt when no parent exists (root).

## Usage

```js
import { buildBreadcrumbChain } from "./breadcrumbs";

const nodes = [
  { id: "home", label: "Home" },
  { id: "docs", label: "Docs", parentId: "home" },
  { id: "hooks", label: "Hooks", parentId: "docs" },
];

buildBreadcrumbChain(nodes, "hooks");
// → [{id:"home",label:"Home"},{id:"docs",label:"Docs"},{id:"hooks",label:"Hooks"}]
```

## Project structure

```
breadcrumb-chain-problem/
├── index.html
├── package.json
├── src/
│   ├── BreadcrumbDemo.jsx
│   ├── breadcrumbs.js
│   ├── index.jsx
│   └── styles.css
└── vite.config.js
```

## Run locally

```bash
cd breadcrumb-chain-problem
npm install
npm run dev
```

Visit `http://localhost:5173` to try the interactive editor and breadcrumb preview.
