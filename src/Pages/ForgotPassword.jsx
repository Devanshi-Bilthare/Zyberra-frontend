import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, resetState } from "../features/user/UserSlice";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );

  /*  Clear previous flags when the page mounts  */
  useEffect(() => {
    dispatch(resetState());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    dispatch(forgotPassword({ email }));
  };

  return (
    <div className="w-full h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row shadow-xl rounded-xl overflow-hidden">
        {/* Left Image */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://img.freepik.com/premium-vector/global-network-connection-abstract-concept-vector-illustration_107173-25598.jpg"
            alt="forgot password"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 bg-gray-100 p-8 flex flex-col justify-center">
          <h1 className="text-2xl font-semibold text-gray-800 px-4 py-2 text-center">
            <Link to="/">ZYBERRA</Link>
          </h1>

          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Reset Your Password
          </h2>

          {/* feedback messages */}
          {isError && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center">
              {message || "Something went wrong. Try again."}
            </div>
          )}
          {isSuccess && (
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 text-center">
              A reset link has been sent to your e-mail.
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full text-gray-900 bg-transparent border-b border-gray-400 focus:outline-none focus:border-gray-700 placeholder-gray-600 py-2"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 w-full py-2 bg-gray-200 text-gray-800 font-medium rounded-xl shadow-inner hover:bg-gray-300 transition duration-200"
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
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
