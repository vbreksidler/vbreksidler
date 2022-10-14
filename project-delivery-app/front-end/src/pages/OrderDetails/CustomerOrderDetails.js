/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import CustomerOrderDetailsTable
  from '../../componentes/Tables/CustomerOrderDetailsTable';
import CustomerOrderDetailsTableWrapper
  from '../../componentes/ODTW/CustomerOrderDetailsTableWrapper';
import api from '../../helpers/api';
import CustomerOrderTotalPrice
  from '../../componentes/TotalPrice/CustomerOrderTotalPrice';

export default function CustomerOrderDetails() {
  const orderId = useParams();

  const [order, setOrder] = useState({});
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    api.get(`/sales/${+orderId.id}`)
      .then((response) => setOrder(response.data));
  }, [disabled]);

  const handleDelivered = async () => {
    try {
      await api.patch(`sales/finishOrder/${orderId.id}`);
      setDisabled(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!order?.id) {
    return null;
  }
  return (
    <CustomerOrderDetailsTableWrapper
      orderNumber={ order.id }
      status={ order.status }
      date={ format(Date.parse(order.saleDate), 'dd/MM/yyyy') }
      disable={ disabled }
      setDelivered={ handleDelivered }
    >
      <CustomerOrderDetailsTable orders={ order.products } />
      <CustomerOrderTotalPrice testIdPrefix="customer_order" />
    </CustomerOrderDetailsTableWrapper>
  );
}
