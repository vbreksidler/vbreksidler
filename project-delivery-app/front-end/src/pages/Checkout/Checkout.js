import React from 'react';
import Address from '../../componentes/Checkout/AddressCheckout';
import CustomerCheckoutTable from '../../componentes/Tables/CustomerCheckoutTable';

export default function Checkout() {
  return (
    <div>
      <CustomerCheckoutTable />
      <Address />
    </div>
  );
}
