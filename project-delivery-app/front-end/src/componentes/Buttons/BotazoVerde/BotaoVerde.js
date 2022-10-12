import React from 'react';
import PropTypes from 'prop-types';
import './BotaoVerde.css';

function BotaoVerde({ placeholder }) {
  return (
    <button
      className="botaoVerde"
      type="button"
    >
      <p>{placeholder}</p>
    </button>
  );
}

BotaoVerde.propTypes = {
  placeholder: PropTypes.string.isRequired,
};

export default BotaoVerde;
