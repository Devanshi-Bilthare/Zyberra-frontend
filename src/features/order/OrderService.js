import axios from "axios";
import { base_url, getAuthConfig } from "../../utils/base_url";

const CreateOrder = async () => {
  const response = await axios.post(`${base_url}order/create`, {}, getAuthConfig());
  return response.data;
};

const VerifyPayment = async (paymentData) => {
  const response = await axios.post(`${base_url}order/verify`, paymentData, getAuthConfig());
  return response.data;
};

const GetAllOrders = async ()=>{
    const response = await axios.get(`${base_url}order/all`,getAuthConfig())
    return response.data
}

const GetStats = async ()=>{
    const response = await axios.get(`${base_url}order/stats`,getAuthConfig())
    return response.data
}


const OrderService = { CreateOrder, VerifyPayment,GetAllOrders,GetStats };
export default OrderService;
