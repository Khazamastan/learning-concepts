import React from 'react';

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
  const [count, setCount] = React.useState(0);

  if (count === 5) {
    throw new Error('Counter crashed at 5!');
  }

  return (
    <button type="button" onClick={() => setCount((prev) => prev + 1)}>
      Count: {count}
    </button>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BuggyCounter />
    </ErrorBoundary>
  );
}
