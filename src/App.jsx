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
import AddProduct from './Pages/Admin/AddProduct';
import ProductList from './Pages/Admin/ProductList';
import CategoryList from './Pages/Admin/CategoryList';
import AllUsers from './Pages/Admin/AllUsers';
import AllOrders from './Pages/Admin/AllOrders';
import EditProduct from './Pages/Admin/EditProduct';


const App = ({toggleTheme, isDark}) => {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register','/forgot-password'];
  const hideNavbar = location.pathname.startsWith('/admin') || hideNavbarPaths.includes(location.pathname) ||
  location.pathname.startsWith('/reset-password');


  return (
    <>
      {!hideNavbar && <Navbar toggleTheme={toggleTheme} isDark={isDark} />}
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
        <Route path='/admin/add-product' element={<AdminRoute><AddProduct /></AdminRoute>} />
        <Route path='/admin/product-list' element={<AdminRoute><ProductList /></AdminRoute>} />
        <Route path='/admin/product-detail/:id' element={<AdminRoute><EditProduct /></AdminRoute>} />
        <Route path='/admin/all-categories' element={<AdminRoute><CategoryList /></AdminRoute>} />
        <Route path='/admin/all-users' element={<AdminRoute><AllUsers /></AdminRoute>} />
        <Route path='/admin/all-orders' element={<AdminRoute><AllOrders /></AdminRoute>} />

      </Routes>
    </>
  );
};

export default App;
