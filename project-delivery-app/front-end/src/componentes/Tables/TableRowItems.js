import PropTypes from 'prop-types';
import React from 'react';
import formatToPrice from '../../helpers/formatToPrice';
import styles from './styles.module.scss';


export default function TableRowItems(
  { testIdPrefix, itemNumber, description, quantity, unityValue, subTotal },
) {
  return (
    <div className={styles.CustomerCardContainer}>
      <td
        data-testid={
          `${testIdPrefix}__element-order-table-item-number-${itemNumber - 1}`
        }
      >Produto nº:{' '} 
        {itemNumber}
        {'.'}
      </td>
      <td
        data-testid={
          `${testIdPrefix}__element-order-table-name-${itemNumber - 1}`
        }
      >Produto: {' '}
        {description}
        {'.'}
      </td>
      <td
        data-testid={
          `${testIdPrefix}__element-order-table-quantity-${itemNumber - 1}`
        }
      >Quantidade: {' '}
        {quantity}
        {'.'}
      </td>
      <td
        data-testid={
          `${testIdPrefix}__element-order-table-unit-price-${itemNumber - 1}`
        }
      >
        Valor un. :R$ {' '}
        {formatToPrice(unityValue)}
        {'.'}
      </td>
      <td
        data-testid={
          `${testIdPrefix}__element-order-table-sub-total-${itemNumber - 1}`
        }
      >
        Subtotal: $ {' '}
        {formatToPrice(subTotal)}
        {'.'}
      </td>
    </div>
  );
}

TableRowItems.propTypes = {
  testIdPrefix: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  itemNumber: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  subTotal: PropTypes.number.isRequired,
  unityValue: PropTypes.number.isRequired,
};
