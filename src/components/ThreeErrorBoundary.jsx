import React from "react";

export default class ThreeErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.warn("[Three.js Error]", error);
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}
