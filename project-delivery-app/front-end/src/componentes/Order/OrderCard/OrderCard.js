import React from 'react';
import PropTypes from 'prop-types';
import './OrderCard.css';
import OrderStatus from '../OrderStatus/OrderStatus';

function OrderCard({ orderStatus, orderId, orderDate, orderPrice, address }) {
  return (
    <div className="order-card">
      <p data-testid={ orderId.dataTestId } className="order-number">
        { `Pedido ${orderId.value}` }
      </p>
      <OrderStatus { ...orderStatus } />
      <div className="box">
        <p data-testid={ orderDate.dataTestId }>{ orderDate.value }</p>
        <p data-testid={ orderPrice.dataTestId }>{ orderPrice.value }</p>
      </div>
      { !!address && (
        <p data-testid={ address.dataTestId } className="address">
          { address.value }
        </p>
      )}
    </div>
  );
}

const o = {
  value: PropTypes.string,
  dataTestId: PropTypes.string,
};

OrderCard.propTypes = {
  orderId: PropTypes.shape(o).isRequired,
  orderStatus: PropTypes.shape(o).isRequired,
  orderDate: PropTypes.shape(o).isRequired,
  orderPrice: PropTypes.shape(o).isRequired,
  address: PropTypes.shape(o).isRequired,
};

export default OrderCard;
