import React from 'react';
import PropTypes from 'prop-types';
import formatToPrice from '../../helpers/formatToPrice';

export default function SellerOrderTotalPrice({ totalPrice }) {
  return (
    <div className={styles.totalPriceContainer}>
      Total Price: R$
      <p className={styles.price} data-testid="seller_order_details__element-order-total-price">
        { formatToPrice(totalPrice) }
      </p>
    </div>
  );
}

SellerOrderTotalPrice.propTypes = {
  totalPrice: PropTypes.number.isRequired,
};
