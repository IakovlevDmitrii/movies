import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alert from '../alert';

export default class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;

    if (hasError) {
      return <Alert type="error" message="Error" description="Something has gone wrong" />;
    }

    const { children } = this.props;
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};
