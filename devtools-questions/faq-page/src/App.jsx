import { useState } from 'react';
import './styles.css';

const FAQ = [
  {
    id: 'authentication',
    question: 'How do I reset my account password?',
    answer:
      'Go to account settings → Security → Reset password. We will send a verification link to your registered email address to complete the process.'
  },
  {
    id: 'workspace',
    question: 'Can I invite collaborators to a workspace?',
    answer:
      'Yes, every workspace supports granular roles. Choose Invite teammate, enter their email, and assign Viewer, Commenter, or Editor permissions.'
  },
  {
    id: 'billing',
    question: 'Where can I download past invoices?',
    answer:
      'Navigate to Billing → Invoices. You can export every invoice in PDF format and forward them automatically to your finance inbox.'
  },
  {
    id: 'support',
    question: 'What is the SLA for Enterprise support?',
    answer:
      'Enterprise plans include 24/7 priority chat plus a dedicated Success Manager with a 2 hour critical incident response time.'
  }
];

export default function App() {
  const [activeId, setActiveId] = useState(FAQ[0].id);

  return (
    <main className="faq">
      <header>
        <h1>Knowledge Base</h1>
        <p>Answers to the most common workspace questions.</p>
      </header>
      <section className="faq__items">
        {FAQ.map((item) => {
          const isOpen = item.id === activeId;
          return (
            <article key={item.id} className={`faq__item ${isOpen ? 'is-open' : ''}`}>
              <button type="button" onClick={() => setActiveId(isOpen ? null : item.id)}>
                <span>{item.question}</span>
                <span className={`faq__chevron ${isOpen ? 'is-open' : ''}`}>▾</span>
              </button>
              {isOpen && <p>{item.answer}</p>}
            </article>
          );
        })}
      </section>
    </main>
  );
}
