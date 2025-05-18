import axios from "axios";
import { base_url } from "../../utils/base_url";

const AddToCart = async ()=>{
    const response = await axios.post(`${base_url}cart/add`)
    return response.data
}


const CartService = {AddToCart}

export default CartService
