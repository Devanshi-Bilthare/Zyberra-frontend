import axios from "axios";
import { base_url, getAuthConfig } from "../../utils/base_url";

const GetAllProducts = async ()=>{
    const response = await axios.get(`${base_url}product/all`)
    return response.data
}

const GetSingleProduct = async(id) => {
    const response = await axios.get(`${base_url}product/${id}`)
    return response.data
}

const AddProduct = async(data) => {
    const response = await axios.post(`${base_url}product/add`,data,getAuthConfig())
    return response.data
}

const EditProduct = async(data) => {
    const response = await axios.put(`${base_url}product/edit/${data.id}`,data.data,getAuthConfig())
    return response.data
}

const DeleteProduct = async(id) => {
    const response = await axios.delete(`${base_url}product/delete/${id}`,getAuthConfig())
    return response.data
}


const ProductService = {GetAllProducts,GetSingleProduct,AddProduct,EditProduct,DeleteProduct}

export default ProductService
