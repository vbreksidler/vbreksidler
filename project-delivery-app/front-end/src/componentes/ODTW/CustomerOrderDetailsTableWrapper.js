import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

export default function CustomerOrderDetailsTableWrapper(
  { status, date, orderNumber, children, setDelivered },
) {
  return (
    <div className={styles.customerOrderContainer}>
      <div>
        <span
          data-testid="customer_order_details__element-order-details-label-order-id"
        >
          Pedido
          {orderNumber}
        </span>
        <span
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          {date}
        </span>
        <span
          data-testid="customer_order_details__element
            -order-details-label-delivery-status"
        >
          {status}
        </span>
        <button
          disabled={status === 'Entregue'}
          data-testid="customer_order_details__button-delivery-check"
          onClick={setDelivered}
          type="button"
        >
          ENTREGUE
        </button>
      </div>
      {children}
    </div>
  );
}

CustomerOrderDetailsTableWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  date: PropTypes.string.isRequired,
  orderNumber: PropTypes.string.isRequired,
  setDelivered: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};
