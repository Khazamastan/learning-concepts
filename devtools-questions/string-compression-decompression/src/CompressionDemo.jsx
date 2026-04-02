import * as React from "react";
import { compress, decompress } from "./compression.js";

export function CompressionDemo() {
  const [input, setInput] = React.useState("aaabbbccccddddde");
  const [encoded, setEncoded] = React.useState("");
  const [decoded, setDecoded] = React.useState("");
  const [error, setError] = React.useState(null);

  const runCompression = () => {
    const output = compress(input);
    setEncoded(output);
    setDecoded(decompress(output));
    setError(null);
  };

  const handleDecode = () => {
    try {
      setDecoded(decompress(encoded));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  React.useEffect(() => {
    runCompression();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="compression-app">
      <header>
        <h1>String Compression &amp; Decompression</h1>
        <p>Simple run-length encoding implementation. Adjacent repeating characters are replaced with character + count.</p>
      </header>

      <section className="card">
        <label>
          Original string
          <textarea rows={4} value={input} onChange={(event) => setInput(event.target.value)} />
        </label>
        <div className="buttons">
          <button type="button" onClick={runCompression}>
            Compress
          </button>
          <button type="button" onClick={handleDecode}>
            Decompress
          </button>
        </div>
        {error && <p className="error">{error}</p>}
      </section>

      <section className="card result-card">
        <div>
          <h2>Compressed</h2>
          <pre>{encoded}</pre>
        </div>
        <div>
          <h2>Decompressed</h2>
          <pre>{decoded}</pre>
        </div>
      </section>
    </div>
  );
}
