import React from 'react';
import PropTypes from 'prop-types';
import ButtonLogout from '../Buttons/ButtonLogout';

function NavBar({ children }) {
  const { name } = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="NavContainer">
      {children}
      <p
        className="nameNavBar"
        data-testid="customer_products__element-navbar-user-full-name"
      >
        Olá,
        { name }
        !
      </p>
      <div className="FlexContainerNav">
        <div className="buttonLogout">
          <ButtonLogout />
        </div>
      </div>
    </div>
  );
}

NavBar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NavBar;
