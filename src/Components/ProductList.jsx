import React, { useEffect, useRef, useState } from 'react';
import { Heart } from 'lucide-react';

const ProductList = ({ products }) => {
  const [visibleCount, setVisibleCount] = useState(8); // Initial products to show
  const observerRef = useRef(null);

  const visibleProducts = products.slice(0, visibleCount);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && visibleCount < products.length) {
          setVisibleCount((prev) => prev + 8); // Load next batch
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [visibleCount, products.length]);

  return (
    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-0">
      {visibleProducts.map((product) => (
        <div key={product._id} className="w-full">
          <div className="h-[60vh] overflow-hidden mt-6 group">
            <img
              src={product.images[0]?.url}
              alt={product.name}
              loading="lazy"
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

      {/* Observer Element */}
      {visibleCount < products.length && (
        <div ref={observerRef} className="h-10 col-span-full" />
      )}
    </div>
  );
};

export default ProductList;
