import React, { useEffect, useReducer, useState } from 'react';

/**
 * Problem #62: Image auto carousel in React
 *
 * Detailed Problem Statement:
 * Auto-slide images every N ms with manual controls.
 *
 * Example Input:
 * interval = 2000ms
 *
 * Example Output:
 * Image index updates automatically every 2s
 */

export const problem = 'Image auto carousel in React';

export const statement = `
Auto-slide images every N ms with manual controls.
`.trim();

export const exampleInput = `
interval = 2000ms
`.trim();

export const exampleOutput = `
Image index updates automatically every 2s
`.trim();

const DEFAULT_IMAGES = [
  'https://picsum.photos/id/10/800/300',
  'https://picsum.photos/id/20/800/300',
  'https://picsum.photos/id/30/800/300'
];

// Approach 1: useState + setInterval
export function CarouselSolution1({ images = DEFAULT_IMAGES, interval = 2000 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [images.length, interval]);

  return (
    <section>
      <img src={images[index]} alt="carousel" style={{ width: '100%', borderRadius: 8 }} />
      <div style={{ marginTop: 8 }}>
        <button onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}>Prev</button>
        <button onClick={() => setIndex((i) => (i + 1) % images.length)} style={{ marginLeft: 8 }}>
          Next
        </button>
      </div>
    </section>
  );
}

// Approach 2: useReducer carousel engine
function carouselReducer(state, action) {
  switch (action.type) {
    case 'NEXT':
      return { ...state, index: (state.index + 1) % state.total };
    case 'PREV':
      return { ...state, index: (state.index - 1 + state.total) % state.total };
    case 'JUMP':
      return { ...state, index: Math.max(0, Math.min(action.index, state.total - 1)) };
    default:
      return state;
  }
}

export function CarouselSolution2({ images = DEFAULT_IMAGES, interval = 2200 }) {
  const [state, dispatch] = useReducer(carouselReducer, { index: 0, total: images.length });

  useEffect(() => {
    const id = setInterval(() => dispatch({ type: 'NEXT' }), interval);
    return () => clearInterval(id);
  }, [interval]);

  return (
    <section>
      <img src={images[state.index]} alt="slide" style={{ width: '100%' }} />
      <div style={{ marginTop: 8 }}>
        {images.map((_, idx) => (
          <button key={idx} onClick={() => dispatch({ type: 'JUMP', index: idx })}>
            {idx + 1}
          </button>
        ))}
        <button onClick={() => dispatch({ type: 'PREV' })} style={{ marginLeft: 8 }}>
          Prev
        </button>
        <button onClick={() => dispatch({ type: 'NEXT' })} style={{ marginLeft: 8 }}>
          Next
        </button>
      </div>
    </section>
  );
}

// Approach 3: Auto-play with hover pause
export function CarouselSolution3({ images = DEFAULT_IMAGES, interval = 1800 }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [paused, interval, images.length]);

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ border: '1px solid #eee', padding: 8, borderRadius: 10 }}
    >
      <img src={images[index]} alt="slide-auto" style={{ width: '100%', display: 'block' }} />
      <p>{paused ? 'Paused on hover' : 'Auto-playing'}</p>
    </section>
  );
}

export default CarouselSolution1;
