import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaCreditCard, FaLock, FaShoppingCart, FaCheckCircle, FaCalendarAlt, FaTractor } from "react-icons/fa";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const equipmentId = queryParams.get("equipmentId");
  const days = queryParams.get("days");
  const total = queryParams.get("total");

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to proceed with payment.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/booking/book",
        {
          equipmentId: equipmentId,
          startDate: queryParams.get("startDate"),
          endDate: queryParams.get("endDate"),
          requestId: queryParams.get("requestId"),
          amount: total
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        alert("Payment successful! Equipment rented successfully.");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Payment error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Payment failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-green-600 text-white p-6">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <FaCreditCard className="text-yellow-400" />
              Secure Payment
            </h2>
            <p className="mt-2 text-green-100">Complete your equipment rental payment</p>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Order Summary */}
            <div className="bg-green-50 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center gap-2">
                <FaShoppingCart />
                Order Summary
              </h3>
              <div className="space-y-3">
                <SummaryItem icon={FaTractor} label="Equipment ID" value={equipmentId} />
                <SummaryItem icon={FaCalendarAlt} label="Rental Duration" value={`${days} days`} />
                <div className="border-t border-green-200 pt-3 mt-3">
                  <SummaryItem 
                    icon={FaCheckCircle}
                    label="Total Amount" 
                    value={`₹${total}`}
                    highlighted={true}
                  />
                </div>
              </div>
            </div>

            {/* Security Note */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
              <FaLock className="text-green-600" />
              <span>Your payment information is encrypted and secure</span>
            </div>

            {/* Payment Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePayment}
              className="w-full bg-green-600 text-white py-4 px-6 rounded-xl hover:bg-green-700 
                        transition duration-300 flex items-center justify-center gap-2 font-semibold"
            >
              <FaCreditCard />
              Pay ₹{total} Securely
            </motion.button>

            {/* Additional Info */}
            <div className="mt-6 text-center text-sm text-gray-500">
              By clicking "Pay", you agree to our 
              <a href="/terms" className="text-green-600 hover:text-green-700 mx-1">Terms of Service</a>
              and
              <a href="/privacy" className="text-green-600 hover:text-green-700 mx-1">Privacy Policy</a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Helper Component
const SummaryItem = ({ icon: Icon, label, value, highlighted }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2 text-gray-600">
      <Icon className={highlighted ? "text-green-600" : "text-green-500"} />
      <span>{label}</span>
    </div>
    <span className={`font-semibold ${highlighted ? 'text-xl text-green-600' : 'text-gray-800'}`}>
      {value}
    </span>
  </div>
);

export default Payment;
