import React from 'react';

const categories = [
  "Smartphones",
  "Laptops",
  "Tablets",
  "Smartwatches",
  "Cameras",
  "Headphones",
  "Speakers",
  "Drones",
  "Gaming Consoles",
  "Wearables",
];

const CategoriesList = () => {
  return (
    <div className="mt-4 px-4 pt-18">
      <div
        className="flex space-x-12 overflow-x-auto scrollbar-hide py-3 px-6" 
        style={{ scrollBehavior: 'smooth' }}
      >
        {categories.map((cat, index) => (
          <div
            key={index}
            className="flex-shrink-0 cursor-pointer text-gray-400 uppercase font-mediam text-sm whitespace-nowrap hover:text-black transition-colors duration-200"
          >
            {cat}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;
