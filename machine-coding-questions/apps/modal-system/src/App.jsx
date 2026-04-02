import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './styles.css';

function Modal({ open, onClose, title, children }) {
  const dialogRef = useRef(null);
  const lastActiveElementRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    lastActiveElementRef.current = document.activeElement;
    const previouslyHiddenOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll(
          'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const timer = window.setTimeout(() => {
      dialogRef.current?.focus();
    }, 10);

    return () => {
      document.body.style.overflow = previouslyHiddenOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      window.clearTimeout(timer);
      lastActiveElementRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
        ref={dialogRef}
        tabIndex={-1}
      >
        <header className="modal-header">
          <h2 id="modal-title">{title}</h2>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>
        <div className="modal-body">{children}</div>
        <footer className="modal-footer">
          <button type="button" className="secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="primary" onClick={onClose}>
            Confirm
          </button>
        </footer>
      </div>
    </div>,
    document.body
  );
}

export default function App() {
  const [open, setOpen] = useState(false);
  const [autoPrompt, setAutoPrompt] = useState(true);

  useEffect(() => {
    if (!autoPrompt) return;
    const timeout = window.setTimeout(() => setOpen(true), 1200);
    return () => window.clearTimeout(timeout);
  }, [autoPrompt]);

  return (
    <main className="modal-shell">
      <section className="modal-card">
        <header>
          <p className="eyebrow">React Portal</p>
          <h1>Modal & Overlay System</h1>
          <p className="support">
            Uses React 19 with portals, scroll locking, focus trapping, and accessible semantics.
          </p>
        </header>
        <div className="actions">
          <label className="toggle">
            <input type="checkbox" checked={autoPrompt} onChange={(event) => setAutoPrompt(event.target.checked)} />
            <span>Auto-open after mount</span>
          </label>
          <button type="button" className="cta" onClick={() => setOpen(true)}>
            Launch modal
          </button>
        </div>
        <Modal open={open} onClose={() => setOpen(false)} title="Publish new release">
          <p>
            This modal is rendered into <code>document.body</code>. Clicking the overlay, pressing Escape, or
            choosing an action will close it.
          </p>
          <ul>
            <li>Focus stays trapped inside the dialog.</li>
            <li>Scroll on the background is disabled while open.</li>
            <li>Dismiss actions return focus to the launch button.</li>
          </ul>
        </Modal>
      </section>
    </main>
  );
}
