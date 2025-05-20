import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register,reset } from '../features/user/UserSlice';
import { toast } from 'react-toastify';

const Register = () => {
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message } = useSelector((state) => state.user);
  const navigate = useNavigate()


  useEffect(() => {
    if (isError) {
      toast.error(message || "Registration failed.");
    }

    if (isSuccess) {
      toast.success("Registration successful!");
      navigate('/'); 
    }

    dispatch(reset()); 
  }, [isError, isSuccess, message, dispatch, navigate]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-5xl flex flex-col md:flex-row shadow-xl rounded-xl overflow-hidden">
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://img.freepik.com/premium-vector/global-network-connection-abstract-concept-vector-illustration_107173-25598.jpg"
            alt="register"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 bg-gray-100 p-8 flex flex-col justify-center">
          <h1 className="text-2xl font-semibold text-gray-800 px-4 py-2 text-center">
            <Link to='/'>ZYBERRA</Link>
          </h1>

          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Create an Account</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-gray-700 placeholder-gray-600 py-2"
              />
            </div>

            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-gray-700 placeholder-gray-600 py-2"
              />
            </div>

            <div className="relative">
              <input
                type="tel"
                name="mobileNumber"
                placeholder="Mobile Number"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-gray-700 placeholder-gray-600 py-2"
              />
            </div>

            <div className="relative">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-gray-700 placeholder-gray-600 py-2"
              />
            </div>

            <button
              type="submit"
              className="mt-6 w-full py-2 bg-gray-200 text-gray-800 font-medium rounded-xl shadow-inner hover:bg-gray-300 transition duration-200"
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-700 text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
