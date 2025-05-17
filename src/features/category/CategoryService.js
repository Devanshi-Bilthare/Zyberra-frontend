import axios from "axios";
import { base_url } from "../../utils/base_url";

const GetAllCategory = async ()=>{
    const response = await axios.get(`${base_url}category/all`)
    console.log(response)
    return response.data
}


const CategoryService = {GetAllCategory}

export default CategoryService
