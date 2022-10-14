import React from 'react';
import PropTypes from 'prop-types';
import './OrderStatus.css';

const orderStatusOptions = {
  pendente: 'pendente',
  preparando: 'preparando',
  entregue: 'entregue',
};

function OrderStatus({ value = orderStatusOptions, dataTestid }) {
  return (
    <div
      data-testid={ dataTestid }
      className={ `order-status order-status-${value}` }
    >
      <p>{ value }</p>
    </div>
  );
}

OrderStatus.propTypes = {
  value: PropTypes.oneOf(Object.keys(orderStatusOptions)).isRequired,
  dataTestid: PropTypes.string.isRequired,
};

export default OrderStatus;
