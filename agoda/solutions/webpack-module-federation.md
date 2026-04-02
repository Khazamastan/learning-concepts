# Webpack Module Federation

## Purpose

Share code between independently deployed builds at runtime. Hosts consume remotes; remotes expose modules.

## Helper (`createModuleFederationConfig`)

- Validates that a `name` is provided.  
- Fills in sensible defaults for shared `react` and `react-dom` singletons.  
- Returns an object suitable for passing into `new ModuleFederationPlugin(...)`.

### Example Usage

```js
const { createModuleFederationConfig } = require("./webpack-module-federation");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  plugins: [
    new ModuleFederationPlugin(
      createModuleFederationConfig({
        name: "shell",
        remotes: {
          catalog: "catalog@https://cdn.example.com/remoteEntry.js",
        },
        shared: {
          react: { singleton: true },
          "react-dom": { singleton: true },
        },
      })
    ),
  ],
};
```

## Design Tips

- **Version drift:** pin `requiredVersion` or use shared semantic ranges.  
- **Fallbacks:** provide `fallback` modules for optional remotes.  
- **Caching:** serve `remoteEntry.js` with immutable cache headers and versioned URLs.  
- **Observability:** log remote resolution errors to detect outages quickly.  
- **Type safety:** publish type packages (e.g., via npm) or share zod contracts to align host/remote.
