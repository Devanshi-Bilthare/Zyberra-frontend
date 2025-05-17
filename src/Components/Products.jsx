import React, { useEffect } from 'react';
import ProductList from './ProductList';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../features/product/ProductSlice';
import HomeBanner from './HomeBanner';

const Products = ({ selectedCategory }) => {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.product.product);
  const searchQuery = useSelector(state => state.search?.query?.toLowerCase());

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const filteredProducts = productList.filter(product => {
  const matchesCategory = selectedCategory
    ? product.category._id === selectedCategory
    : true;

  const query = searchQuery || '';

  const matchesSearch = query
    ? (
        product.name.toLowerCase().includes(query) ||
        product.category.name.toLowerCase().includes(query) ||
        product.price.toString().includes(query)
      )
    : true;

  return matchesCategory && matchesSearch;
});

  const bannerProduct = !searchQuery
    ? filteredProducts.find(product => product.banner)
    : null;

  const bannerImage = bannerProduct?.images?.[0]?.url || null;

  return (
    <>
      {!searchQuery && bannerImage && 
      <HomeBanner bannerImage={bannerImage} />}
      <ProductList products={filteredProducts} />
    </>
  );
};

export default Products;
