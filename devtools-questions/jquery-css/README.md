# jQuery CSS

## Problem
Recreate the minimal behaviour of jQuery's `.css()` helper: when provided a
value, set the style property, otherwise return the current value.

## Solution
The `css` function first validates the element exposes a `style` object. If a
value is supplied it assigns to `element.style[property]` and returns the
element for chaining. Without a value it simply reads and returns the current
style string, mimicking jQuery's getter/setter duality.

## Running locally
```
npm install
npm start
```
