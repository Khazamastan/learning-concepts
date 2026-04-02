# Lighthouse Performance Guidance

## Score Composition (Performance)
- **Largest Contentful Paint (25%)**
- **Total Blocking Time (30%)**
- **Cumulative Layout Shift (25%)**
- **Speed Index (10%)**
- **Time to Interactive (10%)**

## Improving the Score
1. **Trim JavaScript** – Remove unused dependencies, enable code splitting, serve modern bundles via `<script type="module">`.
2. **Optimize Images** – Serve responsive formats (`<img srcset>`, AVIF/WebP), use `loading="lazy"` for non-critical content.
3. **Cache Strategically** – Apply long-lived cache headers for static assets and use service workers for runtime caching.
4. **Preload Critical Resources** – Fonts (`<link rel="preload">` with `crossorigin`), hero images, above-the-fold CSS.
5. **Measure in Production** – Run `lighthouse-ci` in CI and compare against budgets. Combine with Web Vitals RUM for real-world validation.

## Running via CLI
```bash
npx @lhci/cli autorun --collect.staticDistDir=./dist
```
- `--upload.target=filesystem` saves reports locally.
- Configure budgets using `lighthouserc.js` to fail builds when metrics regress.
