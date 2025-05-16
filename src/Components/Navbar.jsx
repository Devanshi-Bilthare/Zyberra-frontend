import React from 'react';
import { ShoppingCart, Heart, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full px-4 py-3 shadow-md bg-gray-100">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800 px-4 py-2 ">
            <Link to='/'>ZYBERRA</Link>
        </h1>

        <div className="flex items-center gap-4">
          <div className="neumorphic-icon p-2 rounded-full">
            <Heart className="h-5 w-5 text-gray-700" />
          </div>
          <div className="neumorphic-icon p-2 rounded-full">
            <ShoppingCart className="h-5 w-5 text-gray-700" />
          </div>
          <div className="neumorphic-icon p-2 rounded-full">
            <User className="h-5 w-5 text-gray-700" />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mt-3 sm:mt-0 sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-1/2">
        <div className="flex items-center neumorphic-light px-4 py-2 rounded-xl w-full">
          <input
            type="text"
            placeholder="Search..."
            className="w-full outline-none bg-transparent text-gray-700"
          />
        </div>
      </div>
    </div>
    
  );
};

export default Navbar;
