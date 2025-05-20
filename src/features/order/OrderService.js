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

const OrderService = { CreateOrder, VerifyPayment };
export default OrderService;
