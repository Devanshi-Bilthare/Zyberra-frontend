import axios from "axios";
import { base_url } from "../../utils/base_url";

const GetAllProducts = async ()=>{
    const response = await axios.get(`${base_url}product/all`)
    return response.data
}


const ProductService = {GetAllProducts}

export default ProductService
