import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../features/user/UserSlice';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess, user, message } = useSelector(
    (state) => state.user
  );

 useEffect(() => {
    if (isError) {
      toast.error(message || 'Login failed');
    }

    if (isSuccess && user) {
      toast.success('Login successful');
      navigate('/');
    }

    // Reset state on unmount or after showing toast
    return () => {
      dispatch(reset());
    };
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <div className="w-full h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row shadow-xl rounded-xl overflow-hidden">
        {/* Left Image */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://img.freepik.com/premium-vector/global-network-connection-abstract-concept-vector-illustration_107173-25598.jpg"
            alt="login"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Login Form Section */}
        <div className="w-full md:w-1/2 bg-gray-100 p-8 flex flex-col justify-center">
          <h1 className="text-2xl font-semibold text-gray-800 px-4 py-2 text-center">
            <Link to="/">ZYBERRA</Link>
          </h1>

          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Login to Your Account
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-gray-400 focus:outline-none text-gray-900 focus:border-gray-700 placeholder-gray-600 py-2"
              />
            </div>

            <div className="relative">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full text-gray-900 bg-transparent border-b border-gray-400 focus:outline-none focus:border-gray-700 placeholder-gray-600 py-2"
              />
            </div>

            <p className="mt-2 text-gray-900">
              Forgot password?{' '}
              <span className="text-blue-600 hover:underline cursor-pointer">
                <Link to="/forgot-password">Click here</Link>
              </span>
            </p>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 w-full py-2 bg-gray-200 text-gray-800 font-medium rounded-xl shadow-inner hover:bg-gray-300 transition duration-200"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-4 text-sm text-gray-700 text-center">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
