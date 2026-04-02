import * as React from "react";

const FAQ = [
  {
    id: "intro",
    title: "What is the Maker plan?",
    body:
      "The Maker plan gives indie builders access to our deploy pipeline, 1 TB of bandwidth, and hands-on office hours every two weeks.",
  },
  {
    id: "billing",
    title: "How does billing work?",
    body:
      "Invoices are generated on the first business day of the month. You can add multiple payment methods and set backup cards in the billing settings.",
  },
  {
    id: "support",
    title: "Can I talk to a human?",
    body: "Absolutely — community Slack is open 24/7 and we host two live Q&A sessions every Thursday.",
  },
];

export function AccordionDemo() {
  const [openItem, setOpenItem] = React.useState(FAQ[0].id);

  return (
    <main className="shell">
      <header>
        <p className="eyebrow">Knowledge base</p>
        <h1>Frequently asked questions</h1>
        <p>Click, tap, or use your keyboard to expand an answer. Sections collapse automatically when a new one opens.</p>
      </header>
      <section className="accordion" role="presentation">
        {FAQ.map((item) => (
          <AccordionItem
            key={item.id}
            item={item}
            isOpen={openItem === item.id}
            onToggle={() => setOpenItem((prev) => (prev === item.id ? null : item.id))}
          />
        ))}
      </section>
    </main>
  );
}

function AccordionItem({ item, isOpen, onToggle }) {
  const contentRef = React.useRef(null);

  React.useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight;
      contentRef.current.style.maxHeight = isOpen ? height + 'px' : '0px';
    }
  }, [isOpen]);

  const triggerId = item.id + '-trigger';
  const panelId = item.id + '-panel';

  return (
    <article className={isOpen ? "accordion-item accordion-item--open" : "accordion-item"}>
      <h2>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          id={triggerId}
          onClick={onToggle}
        >
          <span>{item.title}</span>
          <span aria-hidden="true" className="icon">
            {isOpen ? "−" : "+"}
          </span>
        </button>
      </h2>
      <div
        ref={contentRef}
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className="panel"
      >
        <p>{item.body}</p>
      </div>
    </article>
  );
}
