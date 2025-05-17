import React, { useState } from 'react'
import CategoriesList from '../Components/CategoriesList'
import HomeBanner from '../Components/HomeBanner'
import Products from '../Components/Products'

const Home = () => {
  const [selectedCategory,setSelectedCategory] = useState(null)
  return (
    <>
      <CategoriesList onCategorySelect={setSelectedCategory} selectedCategory={selectedCategory} />
      <Products selectedCategory={selectedCategory} />
    </>
  )
}

export default Home