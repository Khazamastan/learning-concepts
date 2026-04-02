import { useEffect, useRef, useState } from 'react';
import './styles.css';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

export default function App() {
  const [files, setFiles] = useState([]);
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const handleSelect = (event) => {
    const selected = Array.from(event.target.files ?? []);
    if (selected.length === 0) return;

    const nextMessages = [];
    const accepted = [];

    selected.forEach((file) => {
      if (!file.type.startsWith('image/')) {
        nextMessages.push(`${file.name} rejected: only images are allowed.`);
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        nextMessages.push(`${file.name} rejected: exceeds ${Math.round(MAX_FILE_SIZE / 1024 / 1024)}MB.`);
        return;
      }
      accepted.push({
        id: crypto.randomUUID(),
        name: file.name,
        size: file.size,
        preview: URL.createObjectURL(file)
      });
    });

    setFiles((prev) => [...prev, ...accepted]);
    setMessages(nextMessages);
    event.target.value = '';
  };

  const removeFile = (id) => {
    setFiles((prev) => {
      const next = prev.filter((file) => file.id !== id);
      const removed = prev.find((file) => file.id === id);
      if (removed) URL.revokeObjectURL(removed.preview);
      return next;
    });
  };

  return (
    <main className="upload-shell">
      <section className="upload-card">
        <header>
          <p className="eyebrow">Assets</p>
          <h1>File Upload UI</h1>
          <p className="support">Drag images or browse. Previews display immediately with validation feedback.</p>
        </header>
        <div
          className="dropzone"
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => {
            event.preventDefault();
            event.dataTransfer.dropEffect = 'copy';
          }}
          onDrop={(event) => {
            event.preventDefault();
            const dataTransferFiles = event.dataTransfer.files;
            handleSelect({ target: { files: dataTransferFiles, value: '' } });
          }}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleSelect}
            hidden
          />
          <span className="icon">⬆</span>
          <p>Drag & drop or <button type="button" onClick={() => inputRef.current?.click()}>browse files</button></p>
          <p className="hint">PNG, JPG up to 2MB</p>
        </div>
        {messages.length > 0 && (
          <ul className="messages">
            {messages.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        )}
        <div className="preview-grid">
          {files.map((file) => (
            <figure key={file.id}>
              <img src={file.preview} alt={file.name} loading="lazy" />
              <figcaption>
                <span className="name">{file.name}</span>
                <span className="size">{(file.size / 1024).toFixed(0)} KB</span>
                <button type="button" onClick={() => removeFile(file.id)}>
                  Remove
                </button>
              </figcaption>
            </figure>
          ))}
          {files.length === 0 && <p className="empty">No files uploaded yet.</p>}
        </div>
      </section>
    </main>
  );
}
