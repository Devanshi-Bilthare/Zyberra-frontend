import { useDispatch } from "react-redux";
import { createOrder, verifyPayment } from "../features/order/OrderSlice";
import { toast } from "react-toastify";

const CheckOut = ({ orderValue }) => {
  const dispatch = useDispatch();

  const handleCheckout = async () => {
    try {
      const res = await dispatch(createOrder());

      console.log(res)
      const data = res.payload.razorpayOrder;

      if (!data || !data.id) {
        toast.error("Order creation failed");
        return;
      }

      const options = {
        key: "rzp_test_xQ68OF1Oo10gRz", // 🔁 Replace with your test key from Razorpay
        amount: data.amount,
        currency: data.currency,
        order_id: data.id,
        name: "Your Store Name",
        description: "Order Payment",
        handler: async function (response) {
          console.log(response)
          await dispatch(
            verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            })
          );
          toast.success("Payment Successful");
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#000000",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open(); // 🟢 This is what opens the checkout
    } catch (error) {
      toast.error("Something went wrong with payment");
      console.error(error);
    }
  };

  return (
    <div className="w-full lg:w-[35%] p-2 rounded-md h-fit">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>
      <div className="flex justify-between mb-2 text-sm">
        <span>Order Value</span>
        <span>₹{orderValue}</span>
      </div>
      <div className="flex justify-between mb-2 text-sm">
        <span>Delivery Fee</span>
        <span>₹0</span>
      </div>
      <div className="border-t border-gray-200 my-4"></div>
      <div className="flex justify-between font-semibold text-lg mb-6">
        <span>Total</span>
        <span>₹{orderValue}</span>
      </div>
      <button
        onClick={handleCheckout}
        className="w-full bg-black text-white py-3 rounded hover:bg-gray-900 transition"
      >
        Checkout
      </button>
    </div>
  );
};

export default CheckOut;
