'use client';

import React, { useActionState } from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <p>Something went wrong.</p>
          <button type="button" onClick={this.handleReset}>
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function BuggyCounter() {
  const [state, submit] = useActionState(
    (prev) => {
      const next = prev + 1;
      if (next === 5) {
        throw new Error('Counter crashed at 5!');
      }
      return next;
    },
    0,
  );

  return (
    <form
      action={async () => {
        submit();
      }}
    >
      <button type="submit">Count: {state}</button>
    </form>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BuggyCounter />
    </ErrorBoundary>
  );
}
