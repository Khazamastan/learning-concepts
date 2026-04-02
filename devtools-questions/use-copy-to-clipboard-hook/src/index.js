import React from 'react';
import { createRoot } from 'react-dom/client';
import { useCopyToClipboard } from './useCopyToClipboard.js';

function CopyDemo() {
  const { copiedText, error, copy } = useCopyToClipboard();

  const handleCopy = () => {
    copy('https://devtools.tech');
  };

  return (
    <section>
      <p>Copied: {copiedText ?? 'Nothing copied yet'}</p>
      {error && <p role="alert">Copy failed: {error.message}</p>}
      <button type="button" onClick={handleCopy}>
        Copy link
      </button>
    </section>
  );
}

function App() {
  return (
    <main>
      <h1>useCopyToClipboard demo</h1>
      <CopyDemo />
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
