import React, { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import TableRowItems from './TableRowItems';
import CustomerOrderTotalPrice
  from '../../componentes/TotalPrice/CustomerOrderTotalPrice';
import styles from './styles.module.scss';

export default function CustomerCheckoutTable() {
  const { cart, setCart, setTotalPrice, totalPrice } = useContext(CartContext);

  const handleRemove = (id, subTotal) => {
    const items = cart.filter((item) => item.id !== id);
    setTotalPrice(totalPrice - subTotal);
    setCart(items);
    localStorage.setItem('cart', JSON.stringify(items));
  };

  return (
    <div className={styles.CustomerCheckoutContainer}>
      <div>
        <table>
          <tbody>
            {
              cart.map((product, index) => {
                const subTotal = Number(product.price) * product.quantity;
                return (
                  <tr key={ index }>
                    <TableRowItems
                      testIdPrefix="customer_checkout"
                      itemNumber={ index + 1 }
                      description={ product.name }
                      quantity={ product.quantity }
                      unityValue={ Number(product.price) }
                      subTotal={ subTotal }
                    />
                    <td>
                      <button
                        className={styles.removeButton}
                        type="button"
                        data-testid={
                          `customer_checkout__element-order-table-remove-${index}`
                        }
                        onClick={ () => handleRemove(product.id, subTotal) }
                      >
                        REMOVER
                      </button>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
        <CustomerOrderTotalPrice testIdPrefix="customer_checkout" />
      </div>
    </div>
  );
}
