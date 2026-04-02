import { useState } from 'react';
import { StarRating } from './components/StarRating';
import './styles.css';

type Review = {
  id: number;
  title: string;
  body: string;
  rating: number;
};

const REVIEWS: Review[] = [
  {
    id: 1,
    title: 'Beautiful craftsmanship',
    body: 'The build quality surprised me and the shipping was incredibly fast.',
    rating: 4.5,
  },
  {
    id: 2,
    title: 'Great value',
    body: 'Excellent price for the performance. Battery life could be better.',
    rating: 4,
  },
  {
    id: 3,
    title: 'Solid daily driver',
    body: 'Perfect for everyday use. The customer service has been fantastic.',
    rating: 5,
  },
];

const average = REVIEWS.reduce((total, review) => total + review.rating, 0) / REVIEWS.length;

export default function App() {
  const [userRating, setUserRating] = useState(0);

  return (
    <main className="app-shell">
      <header className="hero">
        <h1>Acme Aurora Headphones</h1>
        <p>Engineered for immersive sound and everyday comfort.</p>
        <div className="hero__rating">
          <StarRating value={average} readOnly precision={0.5} label="Average customer rating" />
          <span className="hero__rating-text">{average.toFixed(1)} out of 5 based on {REVIEWS.length} reviews</span>
        </div>
      </header>

      <section className="rating">
        <h2>Leave a rating</h2>
        <StarRating
          value={userRating}
          precision={0.5}
          onChange={setUserRating}
          label="Rate the product"
        />
        <p className="rating__helper">
          {userRating === 0
            ? 'Tap or use the arrow keys to set your rating.'
            : `You rated this product ${userRating.toFixed(1)} stars.`}
        </p>
      </section>

      <section className="reviews" aria-label="Customer reviews">
        {REVIEWS.map((review) => (
          <article key={review.id} className="review">
            <header>
              <h3>{review.title}</h3>
              <StarRating value={review.rating} readOnly precision={0.5} label={`Rating for ${review.title}`} />
            </header>
            <p>{review.body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
