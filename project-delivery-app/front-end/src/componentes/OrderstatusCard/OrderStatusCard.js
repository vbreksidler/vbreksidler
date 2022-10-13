import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

export default function OrderStatusCard({ id,
  status,
  price,
  date,
  address,
  number,
  prefixId,
  redirect,
}) {
  return (
    <Link
      to={ `/${redirect}/orders/${id}` }
      className={ styles.cardContainer }
    >
      <div
        className={ styles.orderNumber }
        data-testid={ `${prefixId}__element-order-id-${id}` }
      >
        {number}
      </div>
      <div className={ styles.orderDetails }>
        <div>
          <span
            className={ styles.statusDetail }
            data-testid={ `${prefixId}__element-delivery-status-id-${id}` }
          >
            Status:
            { status }
          </span>
          <span
            data-testid={ `${prefixId}__element-order-date-${id}` }
            className={ styles.statusDetail }
          >
            Data:
            { date.replace('Z', ' ').replace('T', ' HORA: ').replace('.000', ' ') }
          </span>
          <span
            data-testid={ `${prefixId}__element-card-price-${id}` }
            className={ styles.statusDetail }
          >
            Total: R$
            { price }
          </span>
        </div>
        <div>
          <span
            className={ styles.statusDetail }
            data-testid={ `${prefixId}__element-card-address-${id}` }
          >
            Endereço:
            { address }
          </span>
        </div>
      </div>
    </Link>
  );
}

OrderStatusCard.propTypes = {
  redirect: PropTypes.string.isRequired,
  prefixId: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  price: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
