# Array Cloning Behavior

## Problem

Spreading an array (`[...array]`) creates a new outer array, but nested objects remain shared references, so mutating either array affects both.

## Solution Overview

- Demonstrate how a shallow clone shares object references by mutating `shallowClone[0].id` and observing the same change in `originalArray`.
- Create a deep clone tailored to the structure by mapping over the array and copying each object with `{ ...item }`.
- Show that mutating the deep clone no longer affects the original array.

## Key Takeaways

1. **Shallow copy ≠ deep copy** — Spreading only duplicates the top-level array.
2. **Explicit deep copy** — Clone nested objects (or use utilities like `structuredClone`) when you need immutability.
3. **Predictable state updates** — Avoid unexpected React state mutations by cloning data before modifying it.
