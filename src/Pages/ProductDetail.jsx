import React, { useEffect, useState } from 'react';
import { Heart, HeartOff } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProduct } from '../features/product/ProductSlice';
import {
  addToWishList,
  removeFromWishList,
  getWishList,
} from '../features/wishlist/WishListSlice';
import { addToCart } from '../features/cart/CartSlice';
import { toast } from 'react-toastify';
import { isLoggedIn } from '../utils/auth';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state) => state.product.singleProduct);
  const { wishList } = useSelector((state) => state.wishlist);

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    dispatch(getSingleProduct(id));
    dispatch(getWishList());
  }, [id, dispatch]);

  useEffect(() => {
    if (product?.images?.length > 0) {
      setSelectedImage(product.images[0].url);
    }
  }, [product]);

  const isWishlisted = wishList?.wishList?.some(
    (item) => item._id === id || item.productId === id
  );

   const handleWishlistToggle = async () => {
      if (!isLoggedIn()) {
      toast.error("Please log in to manage your wishlist.");
      return;
    }
      try {
      if (isWishlisted) {
        await dispatch(removeFromWishList({ productId: id }));
      } else {
        await dispatch(addToWishList({ productId: id }));
      }
  
      dispatch(getWishList());
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Wishlist error:", error);
    }
  
    };

  const handleAddToCart = async () => {
  try {
    const resultAction = await dispatch(addToCart({ productId: id }));

    if (addToCart.fulfilled.match(resultAction)) {
      toast.success("Item added to cart successfully!");
    } else if (addToCart.rejected.match(resultAction)) {
      console.log(resultAction)
      const errorMessage = resultAction.payload?.response?.data?.message || "Failed to add item to cart.";
      toast.error(errorMessage);
    }
  } catch (error) {
    toast.error("Something went wrong while adding to cart.");
    console.error("Add to Cart Error:", error);
  }
};

  return (
    <div className="mt-30 px-6 md:px-16">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left: Main Image */}
        <div className="w-full md:w-[55%] h-[100vh] bg-gray-100 overflow-hidden shadow-md">
          <div className="w-full h-full overflow-hidden group">
            <img
              src={selectedImage}
              alt="Selected Product"
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="w-full md:w-[45%] px-2 flex flex-col justify-start gap-4">
          {/* Title & Heart Icon */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">{product.name}</h2>
            {isWishlisted ? (
              <HeartOff
                className="text-red-500 cursor-pointer"
                onClick={handleWishlistToggle}
              />
            ) : (
              <Heart
                className="text-gray-600 cursor-pointer hover:text-red-500 transition"
                onClick={handleWishlistToggle}
              />
            )}
          </div>
          <p className="text-xl font-medium">₹ {product.price}</p>
          <p className="text-sm ">Category: {product.category?.name}</p>
          {product.quantity > 0 ? (
            <p className="text-sm text-green-600">In Stock: {product.quantity}</p>
          ) : (
            <p className="text-sm text-red-600 font-medium">Out of Stock</p>
          )}

          {/* Thumbnails */}
          <div className="flex gap-3 mt-6 flex-wrap">
            {product.images?.map((img, index) => (
              <div
                key={index}
                className={`w-[80px] h-[80px] overflow-hidden bg-gray-100 shadow-sm border-2 ${
                  selectedImage === img.url ? 'border-gray-400' : 'border-transparent'
                } cursor-pointer`}
                onClick={() => setSelectedImage(img.url)}
              >
                <img
                  src={img.url}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                />
              </div>
            ))}
          </div>

          {/* Add to Cart Button */}
          <button
            className={`mt-6 w-full md:w-[80%] py-4 text-lg transition ${
              product.quantity > 0
                ? 'bg-black text-white hover:bg-gray-900'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={product.quantity === 0}
            onClick={handleAddToCart}
          >
            Add
          </button>

          {/* Description */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold ">Product Description</h3>
            <p className="text-sm mt-2 leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
