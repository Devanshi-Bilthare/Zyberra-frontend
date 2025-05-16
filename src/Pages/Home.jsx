import React from 'react'
import CategoriesList from '../Components/CategoriesList'
import HomeBanner from '../Components/HomeBanner'
import Products from '../Components/Products'

const Home = () => {
  return (
    <>
      <CategoriesList/>
      <HomeBanner/>
      <Products/>
    </>
  )
}

export default Home