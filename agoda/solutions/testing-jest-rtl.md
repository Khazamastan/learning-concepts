# Testing with Jest and React Testing Library

## What the Example Covers

- **Black-box:** render the component and assert on user-visible text after a click.  
- **White-box:** spy on the `onChange` callback to verify internal collaboration.  
- **Grey-box:** assert on behavior that depends on prop wiring (step size) without digging into implementation details.

`createCounterTests` accepts the testing utilities (`render`, `screen`, `userEvent`) so it can be imported by a Jest suite and invoked within a test file.

## Running in a Jest Suite

```js
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createCounterTests } from "./testing-jest-rtl";

createCounterTests({ render, screen, userEvent });
```

Ensure `@testing-library/jest-dom` is added to Jest setup so matchers like `toHaveTextContent` are available.

## Tips

- Keep the component under test simple; factor heavy lifting into pure helpers for easier unit coverage.  
- Reset mocks with `afterEach(jest.clearAllMocks)` to avoid cross-test leakage.  
- Use `userEvent` instead of `fireEvent` for closer-to-real interactions (handles async focus/blur sequencing).  
- Prefer role-based queries (`getByRole`) to mimic accessibility contracts.
