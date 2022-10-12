import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../../componentes/NavBar/NavBar';
import NavBarLink from '../../componentes/NavBarLink/NavBarLink';
import CartProvider from '../../contexts/CartContext';

export default function CustomerLayout() {
  return (
    <CartProvider>
      <NavBar>
        <NavBarLink
          name="Produtos"
          path="/customer/products"
          dataTestId="customer_products__element-navbar-link-products"
        />
        <NavBarLink
          name="Meus Pedidos"
          path="/customer/orders"
          dataTestId="customer_products__element-navbar-link-orders"
        />
      </NavBar>
      <Outlet />
    </CartProvider>
  );
}
