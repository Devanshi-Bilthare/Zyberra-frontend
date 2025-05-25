import axios from "axios";
import { base_url } from "../../utils/base_url";

const GetAllCategory = async ()=>{
    const response = await axios.get(`${base_url}category/all`)
    return response.data
}

const AddCategory = async (data)=>{
    const response = await axios.post(`${base_url}category/add`,data)
    return response.data
}

const EditCategory = async (data)=>{
    const response = await axios.put(`${base_url}category/edit/${data.id}`,data)
    return response.data
}

const DeleteCategory = async (id)=>{
    const response = await axios.delete(`${base_url}category/delete/${id}`)
    return response.data
}


const CategoryService = {GetAllCategory,EditCategory,DeleteCategory,AddCategory}

export default CategoryService
