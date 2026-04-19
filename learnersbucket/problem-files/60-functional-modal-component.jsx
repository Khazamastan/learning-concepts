import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * Problem #60: Functional Modal Component
 *
 * Detailed Problem Statement:
 * Create reusable modal with open/close state and overlay click close.
 *
 * Example Input:
 * Click "Open Modal"
 *
 * Example Output:
 * Modal appears, closes on overlay click
 */

export const problem = 'Functional Modal Component';

export const statement = `
Create reusable modal with open/close state and overlay click close.
`.trim();

export const exampleInput = `
Click "Open Modal"
`.trim();

export const exampleOutput = `
Modal appears, closes on overlay click
`.trim();

function BaseModal({ open, onClose, children }) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      role="presentation"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.45)',
        display: 'grid',
        placeItems: 'center'
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        style={{ background: '#fff', padding: 20, borderRadius: 12, width: 'min(90vw, 420px)' }}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

// Approach 1: Standard reusable modal
export function ModalSolution1() {
  const [open, setOpen] = useState(false);

  return (
    <section>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <BaseModal open={open} onClose={() => setOpen(false)}>
        <h3>Reusable Modal</h3>
        <p>Click outside or press Escape to close.</p>
        <button onClick={() => setOpen(false)}>Close</button>
      </BaseModal>
    </section>
  );
}

// Approach 2: Compound modal API
export function ModalContainer({ children }) {
  const [open, setOpen] = useState(false);
  const api = useMemo(() => ({ open, setOpen }), [open]);

  return children(api);
}

export function ModalSolution2() {
  return (
    <ModalContainer>
      {({ open, setOpen }) => (
        <section>
          <button onClick={() => setOpen(true)}>Launch</button>
          <BaseModal open={open} onClose={() => setOpen(false)}>
            <h3>Compound API Modal</h3>
            <p>State is managed by modal container.</p>
            <button onClick={() => setOpen(false)}>Close</button>
          </BaseModal>
        </section>
      )}
    </ModalContainer>
  );
}

// Approach 3: Custom hook-driven modal
export function useModal(initial = false) {
  const [open, setOpen] = useState(initial);
  return {
    open,
    openModal: () => setOpen(true),
    closeModal: () => setOpen(false)
  };
}

export function ModalSolution3() {
  const modal = useModal();

  return (
    <section>
      <button onClick={modal.openModal}>Open Hook Modal</button>
      <BaseModal open={modal.open} onClose={modal.closeModal}>
        <h3>Hook-based Modal</h3>
        <button onClick={modal.closeModal}>Done</button>
      </BaseModal>
    </section>
  );
}

export default ModalSolution1;
