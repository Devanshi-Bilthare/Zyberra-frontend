// Components/AdminRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAdmin } from '../utils/auth'; // wherever you defined it

const AdminRoute = ({ children }) => {
  return isAdmin() ? children : <Navigate to="/login" replace />;
};

export default AdminRoute;
