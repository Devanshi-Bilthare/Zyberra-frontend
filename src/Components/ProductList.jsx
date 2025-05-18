import React, { useEffect, useRef, useState } from 'react';
import { Heart, HeartOff } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishList, removeFromWishList, getWishList } from '../features/wishlist/WishListSlice'; // Adjust path if needed

const ProductList = ({ products }) => {
  const [visibleCount, setVisibleCount] = useState(8); // Initial products to show
  const observerRef = useRef(null);

  const dispatch = useDispatch();
  const { wishList } = useSelector((state) => state.wishlist);

  // Fetch wishlist on mount
  useEffect(() => {
    dispatch(getWishList());
  }, [dispatch]);

  // Check if product is in wishlist
  const isWishlisted = (productId) => {
    return wishList?.wishList?.some((item) => item._id === productId || item.productId === productId);
  };

  // Toggle wishlist status
  const handleWishlistToggle = async (product) => {
    if (isWishlisted(product._id)) {
      await dispatch(removeFromWishList({ productId: product._id }));
    } else {
      await dispatch(addToWishList({ productId: product._id }));
    }

    // Refresh wishlist
    dispatch(getWishList());
  };

  const visibleProducts = products?.slice(0, visibleCount);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && visibleCount < products.length) {
          setVisibleCount((prev) => prev + 8);
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [visibleCount, products?.length]);

  return (
    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-0">
      {visibleProducts?.map((product) => (
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
            {isWishlisted(product._id) ? (
              <HeartOff
                className="w-4 h-4 text-red-500 cursor-pointer"
                onClick={() => handleWishlistToggle(product)}
              />
            ) : (
              <Heart
                className="w-4 h-4 text-gray-500 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                onClick={() => handleWishlistToggle(product)}
              />
            )}
          </div>
        </div>
      ))}

      {/* Observer Element */}
      {visibleCount < products?.length && (
        <div ref={observerRef} className="h-10 col-span-full" />
      )}
    </div>
  );
};

export default ProductList;
