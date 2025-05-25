import React, { useEffect, useRef, useState } from 'react';
import AdminLayout from '../../Components/Admin/AdminLayout';
import { Mic, MicOff } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../../features/order/OrderSlice';
import OrderTable from '../../Components/Admin/OrderTable';

const AllOrders = ({dashboard}) => {
  const dispatch = useDispatch();
  const allorder = useSelector(state => state.order.order);

  const [search, setSearch] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) return;

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearch(transcript);
      setCurrentPage(1);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const handleVoiceSearch = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const filteredOrder = allorder?.filter((order) =>
    order.user.name.toLowerCase().includes(search.toLowerCase()) ||
    order.status.toLowerCase().includes(search.toLowerCase())
  );

  

  return (
    <AdminLayout>
      <div className="space-y-6 w-full">
        {/* Search Bar */}
        <div className="flex items-center gap-2 neumorphic-light p-4 rounded-xl w-full flex-wrap">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search..........."
            className="flex-1 min-w-[200px] p-2 rounded-lg border border-gray-300 focus:outline-none"
          />
          <button
            onClick={handleVoiceSearch}
            className={`p-2 rounded ${isListening ? 'bg-red-200' : 'bg-blue-200'}`}
            title="Voice Search"
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
        </div>
            <OrderTable orders={filteredOrder}/>
       
      </div>
    </AdminLayout>
  );
};

export default AllOrders;
