import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getWishList } from '../features/wishlist/WishListSlice'
import ProductList from '../Components/ProductList'

const WishList = () => {
  const dispatch = useDispatch()
  const {wishList} = useSelector(state => state.wishlist)

  useEffect(() => {
    dispatch(getWishList())
  },[dispatch])


  return (
    <div className='mt-30'>
      {
     
        wishList.wishList?.length == 0 ? 
        ( <div className="flex items-center justify-center h-64">
          <div className="px-6 py-4 bg-gray-100 rounded-xl shadow-neumorphic text-gray-600 font-medium">
            Wish List is Empty
          </div>
        </div>) :  <ProductList products={wishList.wishList}/>
      }
    </div>
  )
}

export default WishList