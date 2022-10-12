/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import OrderStatusCard from '../../componentes/OrderstatusCard/OrderStatusCard';
import { AuthContext } from '../../contexts/AuthContext';
import api from '../../helpers/api';

export default function SellerOrders() {
  const { auth } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const sellerId = auth.id;

    api.get(`/sales/by-seller/${+sellerId}`)
      .then((response) => setOrders(response.data));
  }, [auth]);

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
          prefixId="seller_orders"
          redirect="seller"
        />
      )))}
    </div>
  );
}
