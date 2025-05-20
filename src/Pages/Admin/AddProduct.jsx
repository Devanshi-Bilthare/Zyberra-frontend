import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from '../../Components/Admin/AdminLayout';
import { useDispatch, useSelector } from 'react-redux';
import { addProdut, resetState } from '../../features/product/ProductSlice';
import { getAllCategory } from '../../features/category/CategorySlice';
import { toast } from 'react-toastify';

const AddProduct = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const { category, isLoading: catLoading } = useSelector((state) => state.category);
  const { isLoading, isSuccess, isError, productAdded } = useSelector((state) => state.product);

  const [formData, setFormData] = useState({
    name: '',
    quantity: 0,
    price: 0,
    description: '',
    category: '',
    banner: false,
  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess && productAdded) {
      toast.success('Product added successfully!');
      dispatch(resetState());
      setFormData({
        name: '',
        quantity: 0,
        price: 0,
        description: '',
        category: '',
        banner: false,
      });
      setImages([]);
      setImagePreviews([]);
    }

    if (isError) {
      toast.error('Failed to add product.');
      dispatch(resetState());
    }
  }, [isSuccess, isError, productAdded, dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = [];
    const newPreviews = [];

    files.forEach((file) => {
      const exists = images.find((img) => img.name === file.name && img.size === file.size);
      if (!exists) {
        newFiles.push(file);
        newPreviews.push({ file, url: URL.createObjectURL(file) });
      }
    });

    setImages((prev) => [...prev, ...newFiles]);
    setImagePreviews((prev) => [...prev, ...newPreviews]);

    e.target.value = null; 
  };

  const handleRemoveImage = (index) => {
    const updatedPreviews = [...imagePreviews];
    const removed = updatedPreviews.splice(index, 1)[0];

    URL.revokeObjectURL(removed.url);
    setImagePreviews(updatedPreviews);
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.category.trim() ||
      images.length === 0
    ) {
      toast.error('Please fill in all required fields and add at least one image.');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('quantity', formData.quantity);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('banner', formData.banner);

    images.forEach((file) => {
      data.append('images', file);
    });

    dispatch(addProdut(data));
  };

  const neumorphicShadow = '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff';
  const neumorphicInsetShadow = 'inset 4px 4px 8px #d1d9e6, inset -4px -4px 8px #ffffff';

  const inputStyle = {
    boxShadow: neumorphicShadow,
    borderRadius: '12px',
    border: 'none',
    padding: '12px 16px',
    background: '#e0e5ec',
    fontSize: '1rem',
    outline: 'none',
    transition: 'box-shadow 0.3s ease',
    width: '100%',
  };

  return (
    <AdminLayout>
      <div
        className="max-w-4xl mx-auto p-8 rounded-3xl"
        style={{
          boxShadow: '20px 20px 60px #d1d9e6, -20px -20px 60px #ffffff',
          background: '#e0e5ec',
          minHeight: '80vh',
        }}
      >
        <h2 className="text-3xl font-semibold mb-8 text-center text-gray-700">Add Product</h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={inputStyle}
                required
                onFocus={(e) => (e.target.style.boxShadow = neumorphicInsetShadow)}
                onBlur={(e) => (e.target.style.boxShadow = neumorphicShadow)}
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min={0}
                style={inputStyle}
                onFocus={(e) => (e.target.style.boxShadow = neumorphicInsetShadow)}
                onBlur={(e) => (e.target.style.boxShadow = neumorphicShadow)}
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min={0}
                step="0.01"
                style={inputStyle}
                onFocus={(e) => (e.target.style.boxShadow = neumorphicInsetShadow)}
                onBlur={(e) => (e.target.style.boxShadow = neumorphicShadow)}
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={catLoading}
                required
                style={inputStyle}
                onFocus={(e) => (e.target.style.boxShadow = neumorphicInsetShadow)}
                onBlur={(e) => (e.target.style.boxShadow = neumorphicShadow)}
              >
                <option value="">Select Category</option>
                {category &&
                  category.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex items-center mt-6 md:mt-0">
              <input
                type="checkbox"
                name="banner"
                checked={formData.banner}
                onChange={handleChange}
                id="banner"
                className="w-6 h-6 accent-gray-600 cursor-pointer"
              />
              <label htmlFor="banner" className="ml-3 font-semibold text-gray-700 cursor-pointer">
                Set as Banner Product
              </label>
            </div>

            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImagesChange}
              style={{ display: 'none' }}
            />

            <div className="md:col-span-2">
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-xl hover:bg-gray-300 transition"
                style={{ boxShadow: neumorphicShadow }}
              >
                Add Image
              </button>
            </div>

            {imagePreviews.length > 0 && (
              <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 md:col-span-2">
                {imagePreviews.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative rounded-lg overflow-hidden group"
                    style={{
                      boxShadow: '6px 6px 12px #c5c9d6, -6px -6px 12px #ffffff',
                      background: '#e0e5ec',
                    }}
                  >
                    <img
                      src={img.url}
                      alt={`preview-${idx}`}
                      className="w-full h-24 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1 right-1 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="md:col-span-2">
              <label className="block mb-2 font-semibold text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                style={inputStyle}
                className="resize-none"
                onFocus={(e) => (e.target.style.boxShadow = neumorphicInsetShadow)}
                onBlur={(e) => (e.target.style.boxShadow = neumorphicShadow)}
              />
            </div>
          </div>

          <div className="mt-10 text-center">
            <button
              type="submit"
              disabled={isLoading}
              style={{ boxShadow: neumorphicShadow }}
              className="px-8 py-3 bg-[#e0e5ec] rounded-xl text-gray-700 font-semibold hover:bg-gray-200 transition disabled:opacity-50"
            >
              {isLoading ? 'Adding...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddProduct;
