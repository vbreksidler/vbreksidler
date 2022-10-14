import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

export default function CustomerOrderDetailsTableWrapper(
  { status, date, orderNumber, children, setDelivered },
) {
  const [className, setClassName] = React.useState(styles.customerOrderSpanDelivered);
  useEffect(() => {
    if (status === 'Entregue') {
      setClassName(styles.deliveredOK);
    } else if (status === 'Preparando') {
      setClassName(styles.deliveredPreparing);
    }
  }, [status]);

  return (
    <div className={ styles.customerOrderContainer }>
      <div className={ styles.customerOrderDetails }>
        <span
          className={ styles.customerOrderSpan }
          data-testid="customer_order_details__element-order-details-label-order-id"
        >
          Pedido
          { orderNumber }
        </span>
        <span
          className={ styles.customerOrderSpan }
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          { date }
        </span>
        <span
          className={ className }
          data-testid="customer_order_details__element
            -order-details-label-delivery-status"
        >
          { status }
        </span>
        <button
          className={ styles.deliverdButton }
          disabled={ status === 'Entregue' }
          data-testid="customer_order_details__button-delivery-check"
          onClick={ setDelivered }
          type="button"
        >
          Seu pedido chegou?
        </button>
      </div>
      { children }
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
