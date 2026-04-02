# Compare Semantic Versions

Implements SemVer 2.0.0 parsing and comparison with an interactive playground. Enter two versions to see which one wins, inspect their components, and experiment with prerelease/build metadata.

## Capabilities

- Strict parsing with informative error messages.
- Comparison respects SemVer precedence rules (major → minor → patch → prerelease).
- Build metadata (`+foo`) is displayed but ignored for ordering.
- UI includes handy presets to demonstrate edge cases.

## Structure

```
compare-semantic-versions/
├── index.html
├── package.json
├── src/
│   ├── SemverPlayground.jsx
│   ├── compareSemver.js
│   ├── index.jsx
│   └── styles.css
└── vite.config.js
```

## Running locally

```bash
cd compare-semantic-versions
npm install
npm run dev
```

Visit `http://localhost:5173` to test versions.

## compareSemver API

```js
import { compareSemver, parseSemver } from "./compareSemver";

compareSemver("1.0.0", "1.0.1"); // → -1
compareSemver("1.0.0-alpha.1", "1.0.0-alpha.2"); // → -1
parseSemver("2.3.4-beta+20240401");
```

`compareSemver` returns `1` if left > right, `-1` if left < right, and `0` when equal.

## Implementation notes

- Regular expression matches major/minor/patch, prerelease identifiers, and build metadata.
- Pre-release comparison differentiates numeric segments from alphanumeric ones.
- Utility functions are independent from React, making them recyclable in CLI or backend contexts.
