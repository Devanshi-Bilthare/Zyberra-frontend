import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import Cart from './Pages/Cart';
import WishList from './Pages/WishList';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Navbar from './Components/Navbar';
import ForgotPassword from './Pages/ForgotPassword';
import PrivateRoute from './Components/PrivateRoute';
import ResetPassword from './Pages/ResetPassword';
import ProductDetail from './Pages/ProductDetail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminRoute from './Components/AdminRoute';
import DashBoard from './Pages/Admin/DashBoard';


const App = () => {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register','/forgot-password','/reset-password'];
  const hideNavbar = location.pathname.startsWith('/admin') || hideNavbarPaths.includes(location.pathname);


  return (
    <>
      {!hideNavbar && <Navbar />}
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path='/wishlist' element={<PrivateRoute><WishList /></PrivateRoute>} />
        <Route path='/product-detail/:id' element={<ProductDetail />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />

        //admin routes
        <Route path='/admin/dashboard' element={<AdminRoute><DashBoard /></AdminRoute>} />
      </Routes>
    </>
  );
};

export default App;
