import { useMemo, useState } from "react";

const PACKAGE_BLUEPRINT = {
  name: "my-library",
  exports: {
    ".": {
      import: "./dist/index.esm.js",
      require: "./dist/index.cjs.js",
      types: "./dist/index.d.ts",
    },
    "./experimental": {
      import: "./dist/experimental.esm.js",
      require: "./dist/experimental.cjs.js",
    },
    "./package.json": "./package.json",
  },
};

export default function ExportsInspector19({ blueprint = PACKAGE_BLUEPRINT }) {
  const [condition, setCondition] = useState("import");

  const entries = useMemo(() => {
    return Object.entries(blueprint.exports).map(([key, value]) => ({
      key,
      target: typeof value === "string" ? value : value[condition],
    }));
  }, [blueprint, condition]);

  return (
    <section>
      <h2>NPM Exports Inspector (React 19)</h2>
      <label>
        Condition
        <select value={condition} onChange={(event) => setCondition(event.target.value)} style={{ marginLeft: 8 }}>
          <option value="import">import</option>
          <option value="require">require</option>
          <option value="types">types</option>
        </select>
      </label>
      <table style={{ width: "100%", marginTop: 12, borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "4px 8px" }}>Export</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "4px 8px" }}>Target</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(({ key, target }) => (
            <tr key={key}>
              <td style={{ padding: "4px 8px" }}>{key}</td>
              <td style={{ padding: "4px 8px", fontFamily: "monospace" }}>{target ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
