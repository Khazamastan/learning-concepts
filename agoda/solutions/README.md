# Solutions Overview

This folder contains JavaScript implementations and accompanying explanations for the requested topics:

- Greedy interval stabbing (`minimum-number-of-planes.js`)
- Dynamic programming (wooden logs jumps)
- Minimum platform calculation
- React concurrency demo
- Micro-frontend orchestration
- Iframe utilities
- Webpack Module Federation helper
- NPM package exposure blueprint
- Testing examples with Jest + React Testing Library
- Testing strategy ratios
- Web Vitals reporting

Every concept has a matching `.md` file with deeper guidance.

## Prerequisites

- Node.js ≥ 18  
- npm, pnpm, or yarn  
- Optional: Jest + React Testing Library, React 18, and `web-vitals` for specific examples.

## Install Dependencies (if running React or testing samples)

```bash
npm init -y
npm install react react-dom @testing-library/react @testing-library/user-event @testing-library/jest-dom jest web-vitals
```

Configure Jest if needed (see [Jest docs](https://jestjs.io/docs/configuration)).

## Running Individual Scripts

Most utilities export functions you can require from a Node script or REPL:

```bash
node -e "const { minimumShotsForPlanes } = require('./solutions/minimum-number-of-planes'); console.log(minimumShotsForPlanes([[1,5],[2,6]]));"
```

For React components (`react-concurrency.js`, `iframe.js`, `testing-jest-rtl.js`), import them into your application or test suite:

```jsx
import { SearchBox } from "./solutions/react-concurrency";
```

`testing-jest-rtl.js` exposes `createCounterTests`; call it from a Jest file after configuring RTL.

## Web Vitals Reporter

To capture metrics in a web app:

```js
import { createWebVitalsReporter } from "./solutions/web-vitals";

createWebVitalsReporter((metric) => {
  console.log(metric);
});
```

Ensure the bundle includes the `web-vitals` package.

## Suggested Workflow

1. Browse the corresponding `.md` summary before running code.  
2. Run or import the `.js` file in your project/tests.  
3. Adjust parameters or extend functions as needed for integration.  
4. Keep this folder as a reference library for interviews, demos, or onboarding.
