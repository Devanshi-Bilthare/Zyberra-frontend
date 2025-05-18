import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Heart, User, Mic } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../features/search/searchSlice';
import { resetState } from '../features/user/UserSlice';

const Navbar = () => {
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');
  const [listening, setListening] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    dispatch(setSearchQuery(value));
  };

  const handleLogout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  dispatch(resetState());
  setUserMenuOpen(false);
  navigate("/login");
};


  const handleVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech Recognition not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchInput(transcript);
      dispatch(setSearchQuery(transcript));
      setListening(false);
    };

    recognition.onerror = () => {
      alert('Voice recognition failed. Please try again.');
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  // Toggle user menu on icon click
  const toggleUserMenu = () => {
    setUserMenuOpen((prev) => !prev);
  };

  // Close user menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full px-4 py-3 shadow-md bg-gray-100 z-50">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800 px-4 py-2">
          <Link to="/">ZYBERRA</Link>
        </h1>

        <div className="flex items-center gap-4 relative" ref={userMenuRef}>
          <div className="neumorphic-icon p-2 rounded-full cursor-pointer">
            <Link to='/wishlist'><Heart className="h-5 w-5 text-gray-700" /></Link>
          </div>
          <div className="neumorphic-icon p-2 rounded-full cursor-pointer">
            <Link to='/cart'><ShoppingCart className="h-5 w-5 text-gray-700" /></Link>
          </div>

          {/* User Icon with click to toggle popup */}
          <div
            className="neumorphic-icon p-2 rounded-full cursor-pointer"
            onClick={toggleUserMenu}
          >
            <User className="h-5 w-5 text-gray-700" />
          </div>

          {/* Popup Menu */}
         {userMenuOpen && (
  <div
    className="absolute top-full right-0 mt-2 w-64 bg-gray-100 border border-gray-300 rounded-xl shadow-neumorphic z-50"
  >
    <ul className="flex flex-col py-2 px-4">
      {user ? (
       <>
  <li className="px-4 py-1 text-sm font-medium text-gray-800">{user.name}</li>
  <li className="px-4 py-0.5 text-xs text-gray-600">{user.email}</li>
  <li className="px-4 py-0.5 mb-3 text-xs text-gray-600">
    {user.mobileNumber}
  </li>

  <button
    onClick={handleLogout}
    className="mx-4 mb-3 w-[calc(100%-2rem)] rounded-lg bg-[#e0e0e0] text-gray-700 
               text-sm font-medium py-2 shadow-[4px_4px_8px_#bebebe,_-4px_-4px_8px_#ffffff]
               hover:shadow-inner hover:text-gray-800 transition-all duration-200"
  >
    Logout
  </button>
</>
      ) : (
        <>
          <li>
            <Link
              to="/register"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
              onClick={() => setUserMenuOpen(false)}
            >
              Register
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
              onClick={() => setUserMenuOpen(false)}
            >
              Login
            </Link>
          </li>
        </>
      )}
    </ul>
  </div>
)}

        </div>
      </div>

      {/* Search Bar with Voice Icon */}
      <div className="mt-3 sm:mt-0 sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-1/2">
        <div className="flex items-center neumorphic-light px-4 py-2 rounded-xl w-full">
          <input
            type="text"
            placeholder="Search..."
            className="w-full outline-none bg-transparent text-gray-700"
            value={searchInput}
            onChange={handleInputChange}
          />
          <Mic
            onClick={handleVoiceSearch}
            className={`ml-2 cursor-pointer h-5 w-5 ${
              listening ? 'animate-pulse text-red-500' : 'text-gray-700'
            }`}
            title="Click to speak"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
