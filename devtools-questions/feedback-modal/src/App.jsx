import { useState } from 'react';
import './styles.css';

export default function App() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);

  const submitFeedback = (event) => {
    event.preventDefault();
    setOpen(false);
    setMessage('');
    setRating(5);
    alert('Thanks for sharing your feedback!');
  };

  return (
    <main className="feedback">
      <h1>Feedback Modal</h1>
      <p>Click the button to share feedback with the product team.</p>
      <button type="button" onClick={() => setOpen(true)}>
        Leave feedback
      </button>

      {open && (
        <article className="feedback__overlay" role="dialog" aria-modal="true">
          <form className="feedback__modal" onSubmit={submitFeedback}>
            <header>
              <h2>We would love to hear from you</h2>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close">
                ✕
              </button>
            </header>
            <label>
              Rating: {rating}
              <input
                type="range"
                min="1"
                max="10"
                value={rating}
                onChange={(event) => setRating(Number(event.target.value))}
              />
            </label>
            <label>
              Feedback
              <textarea
                rows="4"
                required
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Tell us what worked well or what we could improve…"
              />
            </label>
            <footer>
              <button type="submit">Send feedback</button>
            </footer>
          </form>
        </article>
      )}
    </main>
  );
}
