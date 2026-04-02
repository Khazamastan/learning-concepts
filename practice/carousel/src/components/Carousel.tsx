
import { useEffect, useMemo, useRef, useState } from 'react';

type Slide = {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
};

type CarouselProps = {
  slides: Slide[];
  autoPlay?: boolean;
  interval?: number;
  loop?: boolean;
};

export function Carousel({ slides, autoPlay = true, interval = 5000, loop = true }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const timer = useRef<number | null>(null);
  const trackRef = useRef<HTMLUListElement | null>(null);
  const slideCount = slides.length;

  const safeSlides = useMemo(() => slides.filter(Boolean), [slides]);

  const goTo = (index: number) => {
    const nextIndex = loop
      ? (index + slideCount) % slideCount
      : Math.max(0, Math.min(slideCount - 1, index));
    setActiveIndex(nextIndex);
  };

  const toggleAutoPlay = (shouldPlay: boolean) => {
    if (!autoPlay) return;
    if (timer.current) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
    if (shouldPlay) {
      timer.current = window.setTimeout(() => {
        goTo(activeIndex + 1);
      }, interval);
    }
  };

  useEffect(() => {
    toggleAutoPlay(true);
    return () => {
      if (timer.current) {
        window.clearTimeout(timer.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, autoPlay, interval]);

  useEffect(() => {
    const node = trackRef.current;
    if (!node) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        goTo(activeIndex + 1);
      } else if (event.key === 'ArrowLeft') {
        goTo(activeIndex - 1);
      }
    };
    node.addEventListener('keydown', handleKey);
    return () => node.removeEventListener('keydown', handleKey);
  }, [activeIndex]);

  return (
    <section className="carousel" aria-roledescription="carousel">
      <header className="carousel__header">
        <div>
          <p className="carousel__eyebrow">Featured case studies</p>
          <h2>Built for fast teams</h2>
        </div>
        <div className="carousel__controls" role="group" aria-label="Slide controls">
          <button
            type="button"
            className="carousel__control"
            onClick={() => goTo(activeIndex - 1)}
            aria-label="Previous slide"
            disabled={!loop && activeIndex === 0}
          >
            Prev
          </button>
          <button
            type="button"
            className="carousel__control"
            onClick={() => goTo(activeIndex + 1)}
            aria-label="Next slide"
            disabled={!loop && activeIndex === slideCount - 1}
          >
            Next
          </button>
        </div>
      </header>

      <ul
        ref={trackRef}
        className="carousel__track"
        tabIndex={0}
        aria-live={autoPlay ? 'polite' : 'off'}
        onFocus={() => toggleAutoPlay(false)}
        onBlur={() => toggleAutoPlay(true)}
      >
        {safeSlides.map((slide, index) => {
          const isActive = index === activeIndex;
          return (
            <li
              key={slide.id}
              className={`carousel__slide${isActive ? ' carousel__slide--active' : ''}`}
              aria-hidden={!isActive}
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slideCount}`}
            >
              <article className="carousel__card">
                <img src={slide.imageUrl} alt={slide.title} loading="lazy" />
                <div className="carousel__content">
                  <h3>{slide.title}</h3>
                  <p>{slide.description}</p>
                  <button type="button" className="carousel__cta">View story</button>
                </div>
              </article>
            </li>
          );
        })}
      </ul>

      <nav className="carousel__pagination" aria-label="Slide pagination">
        {safeSlides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={`carousel__dot${index === activeIndex ? ' carousel__dot--active' : ''}`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === activeIndex}
            onClick={() => goTo(index)}
          >
            <span />
          </button>
        ))}
      </nav>
    </section>
  );
}
