import React from 'react';
import PropTypes from 'prop-types';
import './ErrorMessage.css';

function ErrorMessage({ dataTestId, children }) {
  return (
    <p data-testid={ dataTestId } className="ErrorMessage">
      { `⚠ ${children}` }
    </p>
  );
}

ErrorMessage.propTypes = {
  dataTestId: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default ErrorMessage;
