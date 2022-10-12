import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const value = React.useMemo(() => ({
    cart, setCart, totalPrice, setTotalPrice,
  }), [cart, totalPrice]);

  return (
    <CartContext.Provider value={ value }>
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
