import { configureStore } from '@reduxjs/toolkit';
import  ProductSlice  from '../features/product/ProductSlice';
import  CategorySlice  from '../features/category/CategorySlice';
import searchReducer from '../features/search/searchSlice'

export const store = configureStore({
  reducer: {
    product: ProductSlice,
    category : CategorySlice,
    search: searchReducer
  },
});
