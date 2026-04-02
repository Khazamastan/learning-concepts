import { useState } from 'react';
import './styles.css';

export default function App() {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(128);

  const toggleLike = () => {
    setLiked((current) => {
      const next = !current;
      setCount((prev) => prev + (next ? 1 : -1));
      return next;
    });
  };

  return (
    <main className="like-button-demo">
      <h1>Like Button</h1>
      <button
        type="button"
        className={`like-button ${liked ? 'is-liked' : ''}`}
        onClick={toggleLike}
      >
        <span className="like-button__icon">♥</span>
        <span>{liked ? 'Unlike' : 'Like'}</span>
      </button>
      <p>{count.toLocaleString()} appreciation(s)</p>
    </main>
  );
}
