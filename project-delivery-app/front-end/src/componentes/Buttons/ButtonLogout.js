import React from 'react';
import { Link } from 'react-router-dom';

function ButtonLogout() {
  return (
    <Link
      to="/"
      data-testid="customer_products__element-navbar-link-logout"
      onClick={ () => localStorage.removeItem('user') }
    >
      Sair
    </Link>
  );
}

export default ButtonLogout;
