import React from 'react';
import OrderDetailsTable from './OrderDetailsTable';

export default function SellerOrderDetailsTable(props) {
  return (
    <OrderDetailsTable userType="seller" { ...props } />
  );
}
