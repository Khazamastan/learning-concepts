# Focus-Only Reveal (Vanilla JS)

## What It Demonstrates
- Keeps visually hidden UI elements hidden for pointer users while showing them to keyboard users.
- Applies a safe fallback for browsers that do not support the `:focus-visible` pseudo-class.

## Key Points
1. **Progressive Enhancement** – Prefer native `:focus-visible`; only attach JS when the selector is unsupported.
2. **Reduced Pointer Noise** – Blurs the element on `mousedown` so pointer users do not see the skip link.
3. **Accessibility** – The skip link lets keyboard users jump past navigation, improving WCAG 2.4.1 compliance.

## Running the Demo
Open `index.html`. Tab through the page to reveal the skip link. Click it with the mouse to confirm it disappears.
