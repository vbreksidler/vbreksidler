import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../../componentes/NavBar/NavBar';
import NavBarLink from '../../componentes/NavBarLink/NavBarLink';

export default function SellerLayout() {
  return (
    <>
      <NavBar>
        <NavBarLink
          name="Pedidos"
          path="/seller/orders"
          dataTestId="customer_products__element-navbar-link-products"
        />
      </NavBar>
      <Outlet />
    </>
  );
}
