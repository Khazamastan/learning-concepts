import * as React from "react";

const DEFAULT_COLUMNS = [
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
];

const DEFAULT_ROWS = [
  { id: 1, name: "Alice", role: "Engineer" },
  { id: 2, name: "Bhavesh", role: "Designer" },
];

export function DynamicTableGenerator() {
  const [columns, setColumns] = React.useState(DEFAULT_COLUMNS);
  const [rows, setRows] = React.useState(DEFAULT_ROWS);
  const [newColumnLabel, setNewColumnLabel] = React.useState("");

  const addColumn = () => {
    if (!newColumnLabel.trim()) return;
    const key = slugify(newColumnLabel);
    setColumns((current) => [...current, { key, label: newColumnLabel }]);
    setRows((current) =>
      current.map((row) => ({ ...row, [key]: "" })),
    );
    setNewColumnLabel("");
  };

  const addRow = () => {
    const index = rows.length + 1;
    const template = columns.reduce((acc, column) => ({ ...acc, [column.key]: "" }), {});
    setRows((current) => [...current, { id: crypto.randomUUID(), ...template }]);
  };

  const updateCell = (rowId, key, value) => {
    setRows((current) =>
      current.map((row) => (row.id === rowId ? { ...row, [key]: value } : row)),
    );
  };

  const removeColumn = (key) => {
    setColumns((current) => current.filter((column) => column.key !== key));
    setRows((current) =>
      current.map(({ [key]: _, ...rest }) => rest),
    );
  };

  return (
    <div className="table-app">
      <header>
        <h1>Dynamic Table Generator</h1>
        <p>Add columns and rows on the fly. Cells are editable, and column removal updates all rows.</p>
      </header>

      <section className="card controls-card">
        <div className="row">
          <label htmlFor="column-name">New column</label>
          <input
            id="column-name"
            value={newColumnLabel}
            onChange={(event) => setNewColumnLabel(event.target.value)}
            placeholder="e.g. Location"
          />
          <button type="button" onClick={addColumn}>
            Add column
          </button>
        </div>
        <button type="button" className="add-row" onClick={addRow}>
          Add row
        </button>
      </section>

      <section className="card table-card">
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>
                  {column.label}
                  <button type="button" onClick={() => removeColumn(column.key)} aria-label={`Remove ${column.label}`}>
                    ×
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                {columns.map((column) => (
                  <td key={column.key}>
                    <input
                      value={row[column.key] ?? ""}
                      onChange={(event) => updateCell(row.id, column.key, event.target.value)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

function slugify(label) {
  return label
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
}
