import React from 'react';
import PropTypes from 'prop-types';
import CounterProducts from '../CounterProducts/CounterProducts';

function ProductCard({ description, price, image }) {
  return (
    <div>
      <p data-testid={price.dataTestId}>
        {price.value}
      </p>
      <img
        src={image.url}
        alt={description}
        data-testid={image.dataTestId}
      />
      <p data-testid={description.dataTestId}>
        {description.value}
      </p>
      <CounterProducts />
    </div>
  );
}

ProductCard.propTypes = {
  price: PropTypes.shape({
    value: PropTypes.string,
    dataTestId: PropTypes.string,
  }).isRequired,
  description: PropTypes.shape({
    value: PropTypes.string,
    dataTestId: PropTypes.string,
  }).isRequired,
  image: PropTypes.shape({
    url: PropTypes.string,
    dataTestId: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
