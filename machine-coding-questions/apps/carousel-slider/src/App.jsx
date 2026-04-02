import { useEffect, useMemo, useState } from 'react';
import './styles.css';

const SLIDES = [
  {
    title: 'AI Pairing',
    subtitle: 'Ship complex UI faster with collaborative AI reviews.',
    accent: '#1d4ed8'
  },
  {
    title: 'Realtime Handoff',
    subtitle: 'Sync design tokens to production instantly.',
    accent: '#0f766e'
  },
  {
    title: 'Performance Heatmaps',
    subtitle: 'Spot slow renders across devices in minutes.',
    accent: '#c026d3'
  }
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((value) => (value + 1) % SLIDES.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [paused]);

  const activeSlide = useMemo(() => SLIDES[index], [index]);

  const goTo = (step) => {
    setIndex((value) => {
      const next = (value + step + SLIDES.length) % SLIDES.length;
      return next;
    });
  };

  return (
    <main className="carousel-shell">
      <section className="carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <header>
          <p className="eyebrow">Feature carousel</p>
          <h1>Auto & Manual Slider</h1>
          <p className="support">
            Slides advance automatically every 5 seconds. Use arrow buttons or keyboard to navigate manually.
          </p>
        </header>
        <div className="viewport" role="region" aria-live="polite">
          <article key={index} className="slide" style={{ borderColor: activeSlide.accent }}>
            <h2>{activeSlide.title}</h2>
            <p>{activeSlide.subtitle}</p>
          </article>
        </div>
        <nav className="controls" aria-label="Slide controls">
          <button type="button" onClick={() => goTo(-1)} aria-label="Previous slide">
            ‹
          </button>
          <div className="dots">
            {SLIDES.map((slide, slideIndex) => (
              <button
                key={slide.title}
                className={slideIndex === index ? 'dot active' : 'dot'}
                aria-label={`Go to ${slide.title}`}
                aria-pressed={slideIndex === index}
                onClick={() => setIndex(slideIndex)}
              />
            ))}
          </div>
          <button type="button" onClick={() => goTo(1)} aria-label="Next slide">
            ›
          </button>
        </nav>
        <footer className="footer">
          <span>
            Slide {index + 1} of {SLIDES.length}
          </span>
          <button type="button" onClick={() => setPaused((value) => !value)}>
            {paused ? 'Resume autoplay' : 'Pause autoplay'}
          </button>
        </footer>
      </section>
    </main>
  );
}
