import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaCreditCard, FaRupeeSign, FaReceipt, FaCalendarAlt, FaTractor } from 'react-icons/fa';

const PaymentPage = ({ rental }) => {
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const navigate = useNavigate();

  // Mock rental data (replace with actual data from props)
  const rentalDetails = rental || {
    equipmentName: "Mahindra 575",
    duration: "3 days",
    ratePerDay: 2000,
    deposit: 10000,
    total: 16000,
    startDate: "2023-10-15",
    endDate: "2023-10-18"
  };

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await initializeRazorpay();
    if (!res) {
      alert('Razorpay SDK failed to load');
      return;
    }

    setLoading(true);

    // Make API call to your backend to create order
    // const order = await createOrder();

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: rentalDetails.total * 100, // amount in paisa
      currency: "INR",
      name: "AgriGo Equipment Rental",
      description: `Rental payment for ${rentalDetails.equipmentName}`,
      handler: function (response) {
        setPaymentStatus('success');
        // Handle successful payment
        // verifyPayment(response);
      },
      prefill: {
        name: "Farmer Name",
        email: "farmer@example.com",
        contact: "9876543210"
      },
      notes: {
        equipment: rentalDetails.equipmentName,
        duration: rentalDetails.duration,
        startDate: rentalDetails.startDate
      },
      theme: {
        color: "#16a34a"
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-800 flex items-center">
            <FaReceipt className="mr-3 text-green-600" />
            Payment Details
          </h1>

          <div className="space-y-8">
            {/* Equipment Details */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                <FaTractor className="mr-2 text-green-600" />
                Equipment Details
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm">Equipment</p>
                  <p className="font-medium text-lg">{rentalDetails.equipmentName}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm">Duration</p>
                  <p className="font-medium text-lg">{rentalDetails.duration}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm flex items-center">
                    <FaCalendarAlt className="mr-1" /> Start Date
                  </p>
                  <p className="font-medium text-lg">{rentalDetails.startDate}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm flex items-center">
                    <FaCalendarAlt className="mr-1" /> End Date
                  </p>
                  <p className="font-medium text-lg">{rentalDetails.endDate}</p>
                </div>
              </div>
            </div>

            {/* Payment Breakdown */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                <FaRupeeSign className="mr-2 text-green-600" />
                Payment Breakdown
              </h2>
              <div className="space-y-3 bg-gray-50 p-6 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Rental Charge</span>
                  <span className="font-medium">₹{rentalDetails.ratePerDay} × {rentalDetails.duration}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Security Deposit</span>
                  <span className="font-medium">₹{rentalDetails.deposit}</span>
                </div>
                <div className="border-t border-gray-300 my-3"></div>
                <div className="flex justify-between items-center text-lg font-semibold text-green-600">
                  <span>Total Amount</span>
                  <span>₹{rentalDetails.total}</span>
                </div>
              </div>
            </div>

            {/* Payment Button */}
            <div className="flex flex-col items-center space-y-4">
              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full md:w-2/3 bg-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-700 transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center space-x-3"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  <>
                    <FaCreditCard className="text-xl" />
                    <span className="text-lg">Pay Now</span>
                  </>
                )}
              </button>
              <p className="text-sm text-gray-500 flex items-center">
                <FaCheckCircle className="text-green-600 mr-1" />
                Secure payment powered by Razorpay
              </p>
            </div>
          </div>
        </div>

        {/* Payment Status Modal */}
        {paymentStatus === 'success' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-8 max-w-md w-full text-center">
              <FaCheckCircle className="text-6xl text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
              <p className="text-gray-600 mb-6">Your rental has been confirmed.</p>
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
