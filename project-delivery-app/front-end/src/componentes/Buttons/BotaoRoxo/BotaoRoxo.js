import React from 'react';
import PropTypes from 'prop-types';
import './BotaoRoxo.css';

function botaoRoxo({ placeholder }) {
  return (
    <button
      className="botaoRoxo"
      type="button"
    >
      <p>{placeholder}</p>
    </button>
  );
}

botaoRoxo.propTypes = {
  placeholder: PropTypes.string.isRequired,
};

export default botaoRoxo;
