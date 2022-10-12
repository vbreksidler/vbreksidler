import PropTypes from 'prop-types';
import React from 'react';
import TableRowItems from './TableRowItems';
import styles from './styles.module.scss';

export default function OrderDetailsTable({ userType, orders }) {
  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>Detalhes do pedido: </th>
          </tr>
        </thead>
        <tbody>
          {
            orders.length > 0 && orders.map(({ product, quantity }, index) => {
              const subTotal = Number(product.price) * quantity;
              return (
                <tr key={ index }>
                  <TableRowItems
                    testIdPrefix={ `${userType}_order_details` }
                    itemNumber={ index + 1 }
                    description={ product.name || '' }
                    quantity={ quantity }
                    unityValue={ Number(product.price) || 0 }
                    subTotal={ subTotal }
                  />
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}

OrderDetailsTable.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.any),
  ).isRequired,
  userType: PropTypes.string.isRequired,
};
