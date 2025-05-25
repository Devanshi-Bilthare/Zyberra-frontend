import React, { useEffect, useState, useRef } from 'react';
import AdminLayout from '../../Components/Admin/AdminLayout';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, deleteCategory, editCategory, getAllCategory } from '../../features/category/CategorySlice';
import { Edit, Trash, Mic, MicOff } from 'lucide-react';

const CategoryList = () => {
  const dispatch = useDispatch();
  const { category, deletedCategory, addedCategory, editedCategory } = useSelector((state) => state.category);

  const [name, setName] = useState('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const [editData, setEditData] = useState(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch, deletedCategory, addedCategory, editedCategory]);

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

  const handleAdd = () => {
    if (name.trim()) {
      dispatch(addCategory({ name }));
      setName('');
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
  };

  const handleEdit = (cat) => {
    setEditData(cat);
    setEditName(cat.name);
  };

  const handleEditSubmit = () => {
    if (editData && editName.trim()) {
      dispatch(editCategory({ id: editData._id, name: editName }));
      setEditData(null);
    }
  };

  const filtered = category?.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filtered?.length / itemsPerPage);

  return (
   <AdminLayout>
  <div className="p-4 sm:p-6 space-y-6">
    {/* Add Category */}
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 neumorphic-light p-4 rounded-xl">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter category name"
        className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none text-sm"
      />
      <button
        onClick={handleAdd}
        className="px-4 py-2 rounded-lg shadow-neumorphic bg-white hover:bg-gray-100 text-sm"
      >
        Add Category
      </button>
    </div>

    {/* Search with Voice */}
    <div className="flex items-center gap-2 neumorphic-light p-3 rounded-xl">
      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        placeholder="Search categories..."
        className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none text-sm"
      />
      <button
        onClick={handleVoiceSearch}
        className={`p-2 rounded ${isListening ? 'bg-red-200' : 'bg-blue-200'}`}
        title="Voice Search"
      >
        {isListening ? <MicOff size={20} /> : <Mic size={20} />}
      </button>
    </div>

    {/* Category List */}
    <div className="neumorphic-light p-4 rounded-xl overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr>
            <th className="pb-2">#</th>
            <th className="pb-2">Name</th>
            <th className="pb-2">Product Count</th>
            <th className="pb-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated?.map((cat, i) => (
            <tr key={cat._id} className="border-t border-gray-300">
              <td className="py-2">{(currentPage - 1) * itemsPerPage + i + 1}</td>
              <td className="py-2">{cat.name}</td>
              <td className="py-2">{cat.products?.length || 0}</td>
              <td className="py-2 flex gap-2 flex-wrap">
                <button
                  className="cursor-pointer"
                  onClick={() => handleEdit(cat)}
                >
                  <Edit className='hover:text-gray-600' />
                </button>
                <button
                  className="cursor-pointer"
                  onClick={() => handleDelete(cat._id)}
                >
                  <Trash className='hover:text-red-400'/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50 text-sm"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1 rounded-md text-sm ${
                currentPage === idx + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-white shadow-neumorphic'
              }`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50 text-sm"
          >
            Next
          </button>
        </div>
      )}
    </div>
  </div>

  {editData && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm md:max-w-md relative">
        <button
          onClick={() => setEditData(null)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">Edit Category</h2>
        <input
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4 text-sm"
          placeholder="Category Name"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setEditData(null)}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleEditSubmit}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 text-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )}
</AdminLayout>

  );
};

export default CategoryList;
