import React from 'react';
import PropTypes from 'prop-types';
import './BotaoAzul.css';

function BotaoAzul({ placeholder }) {
  return (
    <button
      className="botaoAzul"
      type="button"
    >
      <p>{placeholder}</p>
    </button>
  );
}

BotaoAzul.propTypes = {
  placeholder: PropTypes.string.isRequired,
};

export default BotaoAzul;
