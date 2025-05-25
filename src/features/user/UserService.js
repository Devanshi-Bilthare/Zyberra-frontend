import axios from "axios";
import { base_url } from "../../utils/base_url";

const Register = async (data)=>{
    const response = await axios.post(`${base_url}user/register`,data)
    return response.data
}

const Login = async (data)=>{
    const response = await axios.post(`${base_url}user/login`,data)
    return response.data
}

const ForgotPassword = async(data) => {
    const response = await axios.post(`${base_url}user/forgot-password`,data)
    return response.data
}

const ResetPassword = async(data) => {
    const response = await axios.post(`${base_url}user/reset-password/${data.token}`,data)
    return response.data
}

const AllUsers = async() => {
    const response = await axios.get(`${base_url}user/all`)
    return response.data
}

const UserService = {Register,Login,ForgotPassword,ResetPassword,AllUsers}

export default UserService
