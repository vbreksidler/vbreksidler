import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import PrivateRoutes from './utils/PrivateRoutes';
import AdminLayout from './layouts/LayoutAdministrador/AdminLayout';
import SellerLayout from './layouts/LayoutVendedor/SellerLayout';
import CustomerLayout from './layouts/LayoutCliente/CustomerLayout';
import Products from './pages/Products/Products';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import SellerOrders from './pages/SellerOrders/SellerOrders';
import CustomerOrders from './pages/CustomerOrders/CustomerOrders';
import CustomerOrderDetails from './pages/OrderDetails/CustomerOrderDetails';
import Management from './pages/Management/Management';
import Checkout from './pages/Checkout/Checkout';
import SellerOrderDetails from './pages/OrderDetails/SellerOrderDetails';

function App() {
  return (
    <Routes>
      <Route element={ <PrivateRoutes /> }>
        <Route path="/admin" element={ <AdminLayout /> }>
          <Route path="manage" element={ <Management /> } />
        </Route>
        <Route path="/seller" element={ <SellerLayout /> }>
          <Route path="orders" element={ <SellerOrders /> } />
          <Route path="orders/:id" element={ <SellerOrderDetails /> } />
        </Route>
        <Route path="/customer" element={ <CustomerLayout /> }>
          <Route path="checkout" element={ <Checkout /> } />
          <Route path="orders" element={ <CustomerOrders /> } />
          <Route path="orders/:id" element={ <CustomerOrderDetails /> } />
          <Route path="products" element={ <Products /> } />
        </Route>
      </Route>
      <Route path="/login" element={ <Login /> } />
      <Route exact path="/" element={ <Navigate to="/login" replace /> } />
      <Route path="/register" element={ <Cadastro /> } />
      <Route path="*" element={ <NotFoundPage /> } />
    </Routes>
  );
}

export default App;
document.getElementById('root');
