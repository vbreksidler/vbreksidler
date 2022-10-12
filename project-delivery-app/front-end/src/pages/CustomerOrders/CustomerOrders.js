/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import OrderStatusCard from '../../componentes/OrderstatusCard/OrderStatusCard';
import api from '../../helpers/api';

export default function CustomerOrders() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const customerId = user.id;

    api.get(`/sales/by-customer/${+customerId}`)
      .then((response) => setOrders(response.data));
  }, []);

  return (
    <div>
      {orders && (orders.map(({
        id,
        status,
        totalPrice,
        saleDate,
        deliveryAddress,
      }, index) => (
        <OrderStatusCard
          key={ index }
          id={ id }
          number={ id }
          status={ status }
          date={ saleDate }
          price={ totalPrice }
          address={ deliveryAddress }
          prefixId="customer_orders"
          redirect="customer"
        />
      )))}
    </div>
  );
}
