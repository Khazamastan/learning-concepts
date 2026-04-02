import { ReactNode, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';

type PopoverProps = {
  triggerLabel: string;
  title: string;
  description?: string;
  children: ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
};

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export function Popover({ triggerLabel, title, description, children, placement = 'bottom' }: PopoverProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const titleId = useId();
  const descriptionId = useId();

  const close = () => {
    setOpen(false);
    buttonRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    const handleClick = (event: MouseEvent) => {
      if (!popoverRef.current || popoverRef.current.contains(event.target as Node)) return;
      if (buttonRef.current && buttonRef.current.contains(event.target as Node)) return;
      setOpen(false);
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        close();
      }
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey, true);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey, true);
    };
  }, [open]);

  useLayoutEffect(() => {
    if (!open || !buttonRef.current || !popoverRef.current) return;
    const triggerRect = buttonRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();
    const { innerWidth, innerHeight } = window;

    let top = triggerRect.bottom + 12;
    let left = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2;

    if (placement === 'top') {
      top = triggerRect.top - popoverRect.height - 12;
    } else if (placement === 'left') {
      top = triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2;
      left = triggerRect.left - popoverRect.width - 12;
    } else if (placement === 'right') {
      top = triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2;
      left = triggerRect.right + 12;
    }

    // Keep within viewport padding 16px
    const padding = 16;
    top = Math.max(padding, Math.min(top, innerHeight - popoverRect.height - padding));
    left = Math.max(padding, Math.min(left, innerWidth - popoverRect.width - padding));

    setPosition({ top, left });

    const firstFocusable = popoverRef.current.querySelector<HTMLElement>(FOCUSABLE_SELECTORS);
    firstFocusable?.focus();
  }, [open, placement]);

  useEffect(() => {
    if (!open || !popoverRef.current) return;
    const node = popoverRef.current;

    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const focusable = node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS);
      if (!focusable.length) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    node.addEventListener('keydown', handleTab);
    return () => node.removeEventListener('keydown', handleTab);
  }, [open]);

  return (
    <div className="popover">
      <button
        ref={buttonRef}
        type="button"
        className="popover__trigger"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={`${titleId}-panel`}
        onClick={() => setOpen((prev) => !prev)}
      >
        {triggerLabel}
      </button>

      {open && (
        <div
          ref={popoverRef}
          className={`popover__panel popover__panel--${placement}`}
          role="dialog"
          id={`${titleId}-panel`}
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={description ? descriptionId : undefined}
          style={{ top: position.top, left: position.left }}
        >
          <div className="popover__arrow" aria-hidden="true" />
          <header className="popover__header">
            <h2 id={titleId}>{title}</h2>
            <button type="button" className="popover__close" onClick={close} aria-label="Close">
              ×
            </button>
          </header>
          {description && (
            <p id={descriptionId} className="popover__description">
              {description}
            </p>
          )}
          <div className="popover__content">{children}</div>
        </div>
      )}
    </div>
  );
}
