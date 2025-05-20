import { configureStore } from '@reduxjs/toolkit';
import  ProductSlice  from '../features/product/ProductSlice';
import  CategorySlice  from '../features/category/CategorySlice';
import searchSlice from '../features/search/searchSlice'
import userSlice from '../features/user/UserSlice'
import CartSlice from '../features/cart/CartSLice';
import WishListSlice from '../features/wishlist/WishListSlice';
import OrderSlice from '../features/order/OrderSlice';

export const store = configureStore({
  reducer: {
    product: ProductSlice,
    category : CategorySlice,
    search: searchSlice,
    user:userSlice,
    cart:CartSlice,
    wishlist:WishListSlice,
    order:OrderSlice
  },
});
