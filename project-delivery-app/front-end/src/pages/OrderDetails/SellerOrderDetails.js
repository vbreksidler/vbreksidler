/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import SellerOrderDetailsTable
  from '../../componentes/Tables/SellerOrderDetailsTable';
import SellerOrderDetailsTableWrapper
  from '../../componentes/ODTW/SellerOrderDetailsTableWrapper';
import api from '../../helpers/api';
import SellerOrderTotalPrice from '../../componentes/TotalPrice/SellerOrderTotalPrice';

export default function SellerOrderDetails() {
  const orderId = useParams();

  const [order, setOrder] = useState({});
  useEffect(() => {
    api.get(`/sales/${+orderId.id}`)
      .then((response) => setOrder(response.data));
  }, []);

  const handleDelivery = async () => {
    try {
      await api.patch(`sales/changeStatus/${orderId.id}/?status=1`);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handlePreparing = async () => {
    try {
      await api.patch(`sales/changeStatus/${orderId.id}/?status=0`);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!order?.id) {
    return null;
  }
  return (
    <SellerOrderDetailsTableWrapper
      orderNumber={ order.id }
      status={ order.status }
      date={ format(Date.parse(order.saleDate), 'dd/MM/yyyy') }
      setDelivery={ handleDelivery }
      setPreparing={ handlePreparing }
    >
      <SellerOrderDetailsTable orders={ order.products } />
      <SellerOrderTotalPrice totalPrice={ Number(order.totalPrice) } />
    </SellerOrderDetailsTableWrapper>
  );
}
