import React from 'react';
import { Heart } from 'lucide-react'; // or any other icon library

const ProductList = () => {
  const sampleProducts = [
    {
      _id: "1",
      name: "iPhone 15 Pro",
      price: 1299,
      images: [
        {
          url: "https://images.unsplash.com/photo-1625123507485-36cbd6719438?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D",
        },
      ],
    },
    {
      _id: "2",
      name: "DJI Mini 3 Pro",
      price: 999,
      images: [
        {
          url: "https://images.unsplash.com/photo-1662348318167-d521a9524cce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8REpJJTIwTWluaSUyMDMlMjBQcm98ZW58MHx8MHx8fDA%3D",
        },
      ],
    },
    {
      _id: "3",
      name: "Sony WH-1000XM5",
      price: 999,
      images: [
        {
          url: "https://plus.unsplash.com/premium_photo-1723651234920-f45e156d487c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8U29ueSUyMFdIJTIwMTAwMFhNNXxlbnwwfHwwfHx8MA%3D%3D",
        },
      ],
    },
    {
      _id: "4",
      name: "Samsung Galaxy Tab S8",
      price: 999,
      images: [
        {
          url: "https://images.unsplash.com/photo-1709744722656-9b850470293f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fFNhbXN1bmclMjBHYWxheHklMjBUYWIlMjBTOHxlbnwwfHwwfHx8MA%3D%3D",
        },
      ],
    },
    {
      _id: "5",
      name: "PlayStation 5",
      price: 999,
      images: [
        {
          url: "https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?q=80&w=2014&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      ],
    }
  ];

  return (
    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-0">
      {sampleProducts.map((product) => (
        <div key={product._id} className="w-full">
          <div className="h-[60vh] overflow-hidden mt-6 group">
            <img
              src={product.images[0]?.url}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          </div>
          <div className="px-2 py-1 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium text-gray-800">{product.name}</h3>
              <p className="text-sm text-black">₹ {product.price}</p>
            </div>
            <Heart className="w-4 h-4 text-gray-500 hover:text-red-500 transition-colors duration-200 cursor-pointer" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
