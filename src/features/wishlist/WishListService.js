import axios from "axios";
import { base_url, getAuthConfig } from "../../utils/base_url";

const AddToWishList = async (data)=>{
    const response = await axios.post(`${base_url}wishlist/add`,data,getAuthConfig())
    return response.data
}

const GetWishList = async ()=>{
    const response = await axios.get(`${base_url}wishlist/all`,getAuthConfig())
    return response.data
}

const RemoveFromWishList = async (data)=>{
    const response = await axios.put(`${base_url}wishlist/remove`,data,getAuthConfig())
    return response.data
}


const WishListService = {AddToWishList,GetWishList,RemoveFromWishList}

export default WishListService
