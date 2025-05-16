import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row shadow-xl rounded-xl overflow-hidden">

        {/* Left Image Section */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://img.freepik.com/premium-vector/global-network-connection-abstract-concept-vector-illustration_107173-25598.jpg?ga=GA1.1.1210803105.1747330783&semt=ais_hybrid&w=740"
            alt="forgot password"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 bg-gray-100 p-8 flex flex-col justify-center">

          <h1 className="text-2xl font-semibold text-gray-800 px-4 py-2 text-center">
            <Link to="/">ZYBERRA</Link>
          </h1>

          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Reset Your Password</h2>

          <form className="space-y-6">
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-gray-700 placeholder-gray-600 py-2"
              />
            </div>

            <button
              type="submit"
              className="mt-6 w-full py-2 bg-gray-200 text-gray-800 font-medium rounded-xl shadow-inner hover:bg-gray-300 transition duration-200"
            >
              Send Reset Link
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-700 text-center">
            <Link to="/login" className="text-blue-600 hover:underline">
              ← Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
