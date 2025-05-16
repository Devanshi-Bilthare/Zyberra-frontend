import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import Cart from './Pages/Cart';
import WishList from './Pages/WishList';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Navbar from './Components/Navbar';
import ForgotPassword from './Pages/ForgotPassword';

const App = () => {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register','/forgot-password'];

  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/wishlist' element={<WishList />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
      </Routes>
    </>
  );
};

export default App;
