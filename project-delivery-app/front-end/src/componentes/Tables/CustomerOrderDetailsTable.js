import React from 'react';
import OrderDetailsTable from './OrderDetailsTable';

export default function CustomerOrderDetailsTable(props) {
  return (
    <OrderDetailsTable userType="customer" { ...props } />
  );
}
