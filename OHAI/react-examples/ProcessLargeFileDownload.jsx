'use client';

import React, { useState } from 'react';

async function downloadFile({ url, filename }) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Download failed with status ${response.status}`);
  }
  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = objectUrl;
  anchor.download = filename || 'download.bin';
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(objectUrl);
}

export function ProcessLargeFileDownloadDemo() {
  const [url, setUrl] = useState('http://localhost:3000/downloads/dataset.bin');
  const [filename, setFilename] = useState('dataset.bin');
  const [status, setStatus] = useState('Idle');

  const handleDownload = async () => {
    try {
      setStatus('Downloading...');
      await downloadFile({ url, filename });
      setStatus('Download complete');
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <section>
      <h2>Process 1GB File Download</h2>
      <p>Backend should expose REST endpoint: <code>GET /downloads/:fileName</code>.</p>
      <label>
        Download URL
        <input
          type="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
      </label>
      <label>
        Save As
        <input
          type="text"
          value={filename}
          onChange={(event) => setFilename(event.target.value)}
        />
      </label>
      <button type="button" onClick={handleDownload}>
        Download
      </button>
      <p>Status: {status}</p>
    </section>
  );
}
