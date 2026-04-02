import { ReactNode, useId, useState } from 'react';

type Item = {
  id: string;
  heading: string;
  content: ReactNode;
};

type AccordionProps = {
  items: Item[];
  type?: 'single' | 'multiple';
  defaultExpandedIds?: string[];
  onToggle?: (openIds: string[]) => void;
};

export function Accordion({ items, type = 'single', defaultExpandedIds = [], onToggle }: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(() => [...defaultExpandedIds]);
  const rootId = useId();

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const isOpen = prev.includes(id);
      let next: string[];
      if (type === 'single') {
        next = isOpen ? [] : [id];
      } else {
        next = isOpen ? prev.filter((existing) => existing !== id) : [...prev, id];
      }
      onToggle?.(next);
      return next;
    });
  };

  return (
    <div className="accordion" role="presentation">
      {items.map((item, index) => {
        const panelId = `${rootId}-panel-${item.id}`;
        const buttonId = `${rootId}-button-${item.id}`;
        const open = openIds.includes(item.id);
        return (
          <section key={item.id} className="accordion__section">
            <h3 className="accordion__header">
              <button
                id={buttonId}
                type="button"
                aria-controls={panelId}
                aria-expanded={open}
                className="accordion__trigger"
                onClick={() => toggle(item.id)}
                onKeyDown={(event) => {
                  const { key } = event;
                  if (key !== 'ArrowDown' && key !== 'ArrowUp' && key !== 'Home' && key !== 'End') return;
                  event.preventDefault();
                  const buttons = Array.from(
                    event.currentTarget.parentElement?.parentElement?.querySelectorAll<HTMLButtonElement>('button.accordion__trigger') ?? []
                  );
                  const currentIndex = buttons.indexOf(event.currentTarget);
                  if (key === 'ArrowDown') {
                    buttons[(currentIndex + 1) % buttons.length]?.focus();
                  } else if (key === 'ArrowUp') {
                    buttons[(currentIndex - 1 + buttons.length) % buttons.length]?.focus();
                  } else if (key === 'Home') {
                    buttons[0]?.focus();
                  } else if (key === 'End') {
                    buttons[buttons.length - 1]?.focus();
                  }
                }}
              >
                <span className="accordion__number">{String(index + 1).padStart(2, '0')}</span>
                <span className="accordion__title">{item.heading}</span>
                <span className="accordion__icon" aria-hidden="true">
                  {open ? '-' : '+'}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!open}
              className="accordion__panel"
            >
              <div className="accordion__panel-inner">{item.content}</div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
