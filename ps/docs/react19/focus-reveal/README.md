# React 19 Focus Reveal

- Tracks last input modality to decide when the skip link should be visible.
- Uses passive listeners on `window` to keep event handling simple.
- Applies CSS utility class to toggle visibility without DOM measurements.

## Usage
```jsx
import FocusReveal from './FocusReveal.jsx';
import './FocusReveal.css';

export default function Header() {
  return (
    <>
      <FocusReveal />
      <main id="content" tabIndex={-1}>
        {/* page content */}
      </main>
    </>
  );
}
```
