import React, { useState } from 'react';
import { ShoppingCart, Heart, User, Mic } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../features/search/searchSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');
  const [listening, setListening] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    dispatch(setSearchQuery(value));
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

  return (
    <div className="fixed top-0 left-0 w-full px-4 py-3 shadow-md bg-gray-100 z-50">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800 px-4 py-2">
          <Link to="/">ZYBERRA</Link>
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
