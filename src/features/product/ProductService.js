import axios from "axios";
import { base_url } from "../../utils/base_url";

const GetAllProducts = async ()=>{
    const response = await axios.get(`${base_url}product/all`)
    return response.data
}

const GetSingleProduct = async(id) => {
    const response = await axios.get(`${base_url}product/${id}`)
    return response.data
}

const ProductService = {GetAllProducts,GetSingleProduct}

export default ProductService
