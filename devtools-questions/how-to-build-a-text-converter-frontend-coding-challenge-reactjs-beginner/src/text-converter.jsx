import * as React from "react";

const TRANSFORMS = [
  { id: "upper", label: "UPPERCASE", fn: (value) => value.toUpperCase() },
  { id: "lower", label: "lowercase", fn: (value) => value.toLowerCase() },
  {
    id: "title",
    label: "Title Case",
    fn: (value) =>
      value
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean)
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" "),
  },
  {
    id: "sentence",
    label: "Sentence case",
    fn: (value) => {
      const lower = value.toLowerCase();
      return lower.replace(/(^\s*[a-z])|([.!?]\s+[a-z])/g, (match) => match.toUpperCase());
    },
  },
  {
    id: "slug",
    label: "slug-case",
    fn: (value) =>
      value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-"),
  },
  {
    id: "snake",
    label: "snake_case",
    fn: (value) =>
      value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s_]/g, "")
        .replace(/\s+/g, "_")
        .replace(/_+/g, "_"),
  },
  {
    id: "words",
    label: "Word count",
    fn: (value) => {
      const words = value.trim() ? value.trim().split(/\s+/).length : 0;
      return `${words} ${words === 1 ? "word" : "words"}`;
    },
  },
];

export function TextConverter() {
  const [input, setInput] = React.useState("Simple ideas become remarkable when clearly expressed.");
  const [active, setActive] = React.useState("upper");
  const output = React.useMemo(() => {
    const transform = TRANSFORMS.find((item) => item.id === active) ?? TRANSFORMS[0];
    return transform.fn(input);
  }, [active, input]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  return (
    <div className="converter">
      <header>
        <h1>Text Converter</h1>
        <p>Paste text, choose a transformation, and copy the result for your next task.</p>
      </header>
      <section className="panel">
        <label>
          <span className="label">Source text</span>
          <textarea value={input} onChange={(event) => setInput(event.target.value)} rows={6} />
        </label>
        <div className="toolbar" role="tablist" aria-label="Transformations">
          {TRANSFORMS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active === item.id}
              className={active === item.id ? "tab tab--active" : "tab"}
              onClick={() => setActive(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <label>
          <span className="label">Converted</span>
          <textarea value={output} readOnly rows={6} />
        </label>
        <div className="actions">
          <button type="button" onClick={copyToClipboard}>
            Copy output
          </button>
          <button type="button" onClick={() => setInput("")}>Clear</button>
        </div>
      </section>
    </div>
  );
}
