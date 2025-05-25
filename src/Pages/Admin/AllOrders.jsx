import React, { useEffect, useRef, useState } from 'react';
import AdminLayout from '../../Components/Admin/AdminLayout';
import { Mic, MicOff } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../../features/order/OrderSlice';

const AllOrders = () => {
  const dispatch = useDispatch();
  const allorder = useSelector(state => state.order.order);

  const [search, setSearch] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const paginatedOrders = filteredOrder?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredOrder?.length / itemsPerPage);

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

        {/* User Table */}
        <div className="neumorphic-light p-4 rounded-xl overflow-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="pb-2 px-4 text-left">#</th>
                <th className="pb-2 px-4 text-left">Name</th>
                <th className="pb-2 px-4 text-left">Email</th>
                <th className="pb-2 px-4 text-left">Products</th>
                <th className="pb-2 px-4 text-left">Amount</th>
                <th className="pb-2 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders?.map((order, i) => (
                <tr key={order._id} className="border-t border-gray-300">
                  <td className="py-4 px-4">{(currentPage - 1) * itemsPerPage + i + 1}</td>
                  <td className="py-4 px-4">{order.user.name}</td>
                  <td className="py-4 px-4">{order.user.email}</td>
                  <td className="py-4 px-4">{order.products?.length || 'NA'}</td>
                  <td className="py-4 px-4">{order.amount}</td>
                  <td className="py-4 px-4">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === idx + 1
                      ? 'bg-blue-500 text-white'
                      : 'bg-white shadow'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AllOrders;
