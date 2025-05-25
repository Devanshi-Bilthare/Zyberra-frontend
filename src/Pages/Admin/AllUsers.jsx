import React, { useEffect, useRef, useState } from 'react';
import AdminLayout from '../../Components/Admin/AdminLayout';
import { Mic, MicOff } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { allUsers } from '../../features/user/UserSlice';

const AllUsers = () => {
  const dispatch = useDispatch();
  const alluser = useSelector(state => state.user.allUsers);

  const [search, setSearch] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(allUsers());
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

  const filteredUsers = alluser?.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedUsers = filteredUsers?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredUsers?.length / itemsPerPage);

  return (
    <AdminLayout>
      <div className="space-y-6 w-full">
        <div className="flex items-center gap-2 neumorphic-light p-4 rounded-xl w-full flex-wrap">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by name..."
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

        <div className="neumorphic-light p-4 rounded-xl overflow-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="pb-2 px-4 text-left">#</th>
                <th className="pb-2 px-4 text-left">Name</th>
                <th className="pb-2 px-4 text-left">Email</th>
                <th className="pb-2 px-4 text-left">Phone</th>
                <th className="pb-2 px-4 text-left">Cart Items</th>
                <th className="pb-2 px-4 text-left">Wishlist Items</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers?.map((user, i) => (
                <tr key={user._id} className="border-t border-gray-300">
                  <td className="py-4 px-4">{(currentPage - 1) * itemsPerPage + i + 1}</td>
                  <td className="py-4 px-4">{user.name}</td>
                  <td className="py-4 px-4">{user.email}</td>
                  <td className="py-4 px-4">{user.mobileNumber || 'NA'}</td>
                  <td className="py-4 px-4">{user.cart?.length}</td>
                  <td className="py-4 px-4">{user.wishList?.length}</td>
                </tr>
              ))}
            </tbody>
          </table>

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

export default AllUsers;
