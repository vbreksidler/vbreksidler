import { Outlet, Navigate } from 'react-router-dom';
import React from 'react';
// import { AuthContext } from '../contexts/AuthContext';

export default function PrivateRoutes() {
  // const { auth } = useContext(AuthContext);
  // const { token } = JSON.parse(localStorage.getItem('user')) || '';

  const isAuth = true;

  return isAuth ? <Outlet /> : <Navigate to="/" />;
}
