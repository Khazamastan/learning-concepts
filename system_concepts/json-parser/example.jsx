import { useState } from "react";

export default function JsonParserDemo() {
  const [input, setInput] = useState('{"hello": ["world", 123, true]}');
  const [output, setOutput] = useState("");
  const [error, setError] = useState(null);

  function parseJson() {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (err) {
      setError(err.message);
      setOutput("");
    }
  }

  return (
    <div className="panel">
      <h2>JSON Parser (Browser)</h2>
      <textarea
        rows={6}
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <div className="button-row">
        <button onClick={parseJson}>Parse</button>
      </div>
      {error && <p className="error">Error: {error}</p>}
      {output && (
        <pre className="output">
          {output}
        </pre>
      )}
    </div>
  );
}
