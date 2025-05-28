import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems, decreaseCartQuantity, addToCart, removeFromCart } from '../features/cart/CartSlice';
import { useNavigate } from 'react-router-dom';
import {  X } from 'lucide-react';
import CheckOut from '../Components/CheckOut';
import { toast } from 'react-toastify';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart?.cart.cart);

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  const updateQuantity = async (productId, change) => {
     try {
    let result;
    if (change === 1) {
      result = await dispatch(addToCart({ productId }));
      if (addToCart.rejected.match(result)) {
        toast.error(result.payload.response.data.message || "Failed to increase quantity.");
      }
    } else if (change === -1) {
      result = await dispatch(decreaseCartQuantity({ productId }));
      if (decreaseCartQuantity.rejected.match(result)) {
        toast.error(result.payload.response.data.message || "Failed to decrease quantity.");
      }
    }
    dispatch(getCartItems());
  } catch (error) {
    toast.error("Something went wrong.");
  }
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart({ productId })).then(() => {
      dispatch(getCartItems());
    });
  };

  const orderValue = cartItems?.reduce((acc, item) => acc + item.product.price * item.quantity, 0) || 0;

  return (
    <div className="mt-20 px-6 md:px-16">
      <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Cart Items */}
        <div className="w-full lg:w-[65%] flex flex-col gap-6">
          {cartItems?.map((item) => (
            <div key={item.id} className="relative flex items-start gap-6 p-2">
              <button
                onClick={() => handleRemoveItem(item.product._id)}
                className="absolute top-2 right-2 text-gray-500 cursor-pointer text-2xl font-bold"
                aria-label="Remove item"
              >
                <X/>
              </button>

              {/* Image */}
              <div className="w-[150px] h-[230px] overflow-hidden rounded cursor-pointer" onClick={() => navigate(`/product-detail/${item.product._id}`)}>
                <img
                  src={item?.product.images[0]?.url}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 flex flex-col gap-1">
                <p className="text-xs font-semibold ">ZYBERRA</p>
                <h3 className="text-lg font-semibold ">{item.product.name}</h3>
                <p className="text-sm ">Category: {item.product.category}</p>
                <p className="text-sm ">Price: ₹{item.product.price}</p>
                <p className="text-sm ">Quantity: {item.quantity}</p>
                <p className="text-sm font-semibold">
                  Total: ₹{item.product.price * item.quantity}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center border border px-2 py-1 w-fit mt-2 rounded">
                  <button
                    onClick={() => updateQuantity(item.product._id, -1)}
                    className="text-lg px-2"
                  >
                    -
                  </button>
                  <span className="px-3">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product._id, 1)}
                    className="text-lg px-2"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

          <CheckOut orderValue={orderValue}/>
        
      </div>
    </div>
  );
};

export default Cart;
