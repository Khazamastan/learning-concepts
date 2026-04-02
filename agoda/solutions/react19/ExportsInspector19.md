# NPM Exports Inspector (React 19)

- Visualizes the `exports` map for a package.json blueprint.  
- Switch between module conditions (`import`, `require`, `types`) to inspect what path consumers receive.  
- Drop into docs sites to keep publishing contracts visible to contributors.

## Usage

```jsx
import ExportsInspector19 from "./solutions/react19/ExportsInspector19.jsx";

export default function PackageDocs() {
  return <ExportsInspector19 />;
}
```

Pass your own schema to the `blueprint` prop if you need dynamic inspection.
