import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory } from '../features/category/CategorySlice';
import SpinLoader from './SpinLoader';

const CategoriesList = ({ onCategorySelect, selectedCategory }) => {
  const dispatch = useDispatch();
  const { category: categories, isLoading } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  const filteredCategories = categories?.filter((cat) => cat.products?.length > 0);

  const categoryList = [{ _id: 'all', name: 'All' }, ...(filteredCategories || [])];

  return (
    <div className="mt-4 px-4 pt-28 sm:pt-14 md:pt-14">
      <div
        className="flex space-x-12 overflow-x-auto scrollbar-hide py-3 px-6"
        style={{ scrollBehavior: 'smooth' }}
      >
        {isLoading ? (
          <SpinLoader />
        ) : (
          categoryList.map((cat) => (
            <div
              key={cat._id}
              onClick={() => onCategorySelect(cat._id === 'all' ? null : cat._id)}
              className={`flex-shrink-0 cursor-pointer uppercase font-medium text-sm whitespace-nowrap transition-colors duration-200 px-4 py-2 rounded
                ${selectedCategory === cat._id || (!selectedCategory && cat._id === 'all')
                  ? 'text-black bg-gray-200'
                  : 'text-gray-400 hover:text-black'}`}
            >
              {cat.name}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoriesList;
