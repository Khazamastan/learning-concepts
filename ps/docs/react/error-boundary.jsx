import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (typeof this.props.onError === 'function') {
      this.props.onError(error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      if (React.isValidElement(this.props.fallback)) {
        return this.props.fallback;
      }
      return <p role="alert">Something went wrong.</p>;
    }

    return this.props.children;
  }
}
