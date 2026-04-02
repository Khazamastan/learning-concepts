# NPM Exposed Packages

## Blueprint Overview

- `main` points Node CommonJS consumers to `dist/index.cjs.js`.  
- `module` supports bundlers favoring ES modules.  
- `types` advertises bundled TypeScript declarations.  
- `exports` map drives conditional entry points and hides internal folders.  
- `files` whitelist reduces package size by excluding build artifacts by default.

## Helper

- `resolveExport(condition)` demonstrates how tooling can look up the correct path for a given condition (`import`, `require`, `types`).  
- Throws when a condition is missing, ensuring contract coverage.

## Publishing Checklist

- Run `npm pack --dry-run` to confirm only intended files ship.  
- Follow semantic versioning; automate via `changesets` or similar.  
- Document public API in `README.md`.  
- Consider `sideEffects: false` for tree-shaking friendly code.  
- Use provenance (`npm publish --provenance`) and 2FA for security.
