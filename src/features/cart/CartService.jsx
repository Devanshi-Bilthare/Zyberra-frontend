import axios from "axios";
import { base_url, getAuthConfig } from "../../utils/base_url";

const AddToCart = async (data)=>{
    const response = await axios.post(`${base_url}cart/add`,data,getAuthConfig())
    return response.data
}

const GetCartItems = async ()=>{
    const response = await axios.get(`${base_url}cart/all`,getAuthConfig())
    return response.data
}

const RemoveFromCart = async (data)=>{
    const response = await axios.put(`${base_url}cart/remove`,data,getAuthConfig())
    return response.data
}

const DecreaseCartQuantity = async (data)=>{
    const response = await axios.put(`${base_url}cart/decrease`,data,getAuthConfig())
    return response.data
}


const CartService = {AddToCart,GetCartItems,RemoveFromCart,DecreaseCartQuantity}

export default CartService
