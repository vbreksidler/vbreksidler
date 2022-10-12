import { useContext } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from '../../contexts/CartContext';
import formatToPrice from '../../helpers/formatToPrice';
import styles from './styles.module.scss';

export default function CustomerOrderTotalPrice({ testIdPrefix }) {
  const { totalPrice } = useContext(CartContext);
  return (
    <div className={styles.totalPriceContainer}>
      Total:
      <p className={styles.price} data-testid={ `${testIdPrefix}__element-order-total-price` }>
      R$ { formatToPrice(totalPrice) }
      </p>
    </div>
  );
}

CustomerOrderTotalPrice.propTypes = {
  testIdPrefix: PropTypes.string.isRequired,
};
