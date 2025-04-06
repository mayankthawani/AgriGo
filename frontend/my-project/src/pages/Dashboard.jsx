import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaPlus,
  FaCheckCircle,
  FaUser,
  FaCalendarAlt,
  FaTractor,
  FaGlobe,
} from "react-icons/fa";
import { GrMoney } from "react-icons/gr";
import { BiSupport } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import Chat from "../components/Chat";  // ✅ Import Chat Component
import RequestChat from '../components/RequestChat';  // Add this import at the top
import { useTranslation } from 'react-i18next';
import '../i18n';

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userName, setUserName] = useState("User");
  const [bookings, setBookings] = useState([]);
  const [rentedEquipment, setRentedEquipment] = useState([]);
  const [rentalRequests, setRentalRequests] = useState({ received: [], sent: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    activeBookings: 0,
    totalRentals: 0,
    receivedRequests: 0
  });
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.name) {
      setUserName(storedUser.name);
    }

    const fetchDashboardData = async () => {
      try {
        const [bookingsRes, rentedEquipmentRes, receivedRequestsRes, sentRequestsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/dashboard/my-bookings", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/dashboard/my-rented-equipment", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/equipment/rental-requests/received", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/equipment/rental-requests/sent", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setBookings(bookingsRes.data);
        setRentedEquipment(rentedEquipmentRes.data);
        setRentalRequests({
          received: receivedRequestsRes.data,
          sent: sentRequestsRes.data
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError("Error fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  useEffect(() => {
    const calculateStats = () => {
      const activeCount = rentedEquipment.filter(rental => 
        rental.status === "Confirmed" || rental.status === "Pending"
      ).length;
      
      const totalCount = rentedEquipment.length;
      const receivedRequestsCount = rentalRequests.received?.length || 0;
      
      setStats({
        activeBookings: activeCount,
        totalRentals: totalCount,
        receivedRequests: receivedRequestsCount
      });
    };

    if (!loading) {
      calculateStats();
    }
  }, [rentedEquipment, rentalRequests.received, loading]);

  const handleRequestResponse = async (requestId, status) => {
    try {
      console.log('Updating request:', requestId, 'to:', status); // Debug log

      const response = await axios.patch(
        `http://localhost:5000/api/equipment/rental-requests/${requestId}`,
        { status },
        { 
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          } 
        }
      );

      if (response.data.success) {
        // Update local state to reflect the change
        setRentalRequests(prevState => ({
          ...prevState,
          received: prevState.received.map(request =>
            request._id === requestId 
              ? { ...request, status: status }
              : request
          )
        }));

        // Show success message
        alert(status === 'approved' ? 'Request accepted!' : 'Request rejected');
      } else {
        throw new Error(response.data.message || 'Failed to update status');
      }
    } catch (error) {
      console.error("Error updating request status:", error);
      alert(error.response?.data?.message || "Failed to update request status");
    }
  };

  const handleRatingSubmit = async (requestId, ratingValue) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/equipment/rate/${requestId}`,
        { rating: ratingValue },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        // Update local state to reflect the rating
        setRentalRequests(prev => ({
          ...prev,
          sent: prev.sent.map(req =>
            req._id === requestId ? { ...req, rating: ratingValue } : req
          )
        }));
        setShowRatingModal(false);
        alert('Rating submitted successfully!');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Failed to submit rating');
    }
  };
  
  const renderRatingModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-96">
        <h3 className="text-xl font-bold mb-4">Rate your experience</h3>
        <div className="flex gap-2 justify-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`text-3xl ${
                star <= rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
            >
              ★
            </button>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setShowRatingModal(false)}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => handleRatingSubmit(selectedRequest._id, rating)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Submit Rating
          </button>
        </div>
      </div>
    </div>
  );
  

  const getActiveBookingsCount = () => {
    return rentedEquipment.filter(rental => 
      rental.status === "Confirmed" || rental.status === "Pending"
    ).length;
  };

  const renderRentalRequests = () => (
    <section className="mt-8">
      {/* Received Requests */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('DASHBOARD.REQUESTS.RECEIVED')}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {rentalRequests.received?.map((request) => (
            <motion.div
              key={request._id}
              className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500"
            >
              <h3 className="text-xl font-bold text-gray-800">{request.equipmentId?.name}</h3>
              <div className="mt-2 space-y-2">
                <p className="text-gray-600">{t('DASHBOARD.REQUESTS.FROM')}: {request.renterId?.name}</p>
                <p className="text-gray-600">{t('DASHBOARD.REQUESTS.EMAIL')}: {request.renterId?.email}</p>
                <p className="text-gray-600">{t('DASHBOARD.REQUESTS.PRICE')}: ₹{request.proposedPrice}{t('DASHBOARD.REQUESTS.PRICE_PER_DAY')}</p>
                <p className="text-gray-600">{t('DASHBOARD.REQUESTS.STATUS')}: {request.status}</p>
                {request.message && (
                  <p className="text-gray-600">{t('DASHBOARD.REQUESTS.MESSAGE')}: {request.message}</p>
                )}
              </div>
              
              {request.status === "pending" && (
                <div className="mt-4 flex gap-2">
                  <button 
                    onClick={() => handleRequestResponse(request._id, "approved")}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    {t('DASHBOARD.REQUESTS.ACTIONS.ACCEPT')}
                  </button>
                  <button 
                    onClick={() => handleRequestResponse(request._id, "rejected")}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    {t('DASHBOARD.REQUESTS.ACTIONS.REJECT')}
                  </button>
                </div>
              )}
              
              {request.status === "approved" && (
                <div className="mt-4">
                  <RequestChat 
                    requestId={request._id}
                    otherUserName={request.renterId?.name}
                  />
                </div>
              )}

              {request.status === "rejected" && (
                <p className="mt-4 text-red-500">{t('DASHBOARD.REQUESTS.REQUEST_REJECTED')}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sent Requests */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('DASHBOARD.REQUESTS.SENT')}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {rentalRequests.sent?.map((request) => (
            <motion.div
              key={request._id}
              className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500"
            >
              <h3 className="text-xl font-bold text-gray-800">{request.equipmentId?.name}</h3>
              <p className="text-gray-600">{t('DASHBOARD.REQUESTS.OWNER')}: {request.ownerId?.name}</p>
              <p className="text-gray-600">{t('DASHBOARD.REQUESTS.PRICE')}: ₹{request.proposedPrice}{t('DASHBOARD.REQUESTS.PRICE_PER_DAY')}</p>
              <p className="text-gray-600">{t('DASHBOARD.REQUESTS.STATUS')}: {request.status}</p>
              {request.message && (
                <p className="text-gray-600 mt-2">{t('DASHBOARD.REQUESTS.MESSAGE')}: {request.message}</p>
              )}
              {request.status === "approved" && (
                <button
                  onClick={() => navigate(`/farmer-chat/${request._id}`)}
                  className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  {t('DASHBOARD.REQUESTS.ACTIONS.CHAT')}
                </button>
              )}
              {request.status === "completed" && !request.rating && (
                <button
                  onClick={() => {
                    setSelectedRequest(request);
                    setShowRatingModal(true);
                    setRating(0);
                  }}
                  className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                >
                  {t('DASHBOARD.REQUESTS.ACTIONS.RATE')}
                </button>
              )}
              {request.rating && (
                <div className="mt-4 text-yellow-500">
                  Your Rating: {'★'.repeat(request.rating)}{'☆'.repeat(5-request.rating)}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      {showRatingModal && renderRatingModal()}
    </section>
  );

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    i18n.changeLanguage(savedLanguage);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };
  

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: sidebarOpen ? 0 : -250 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 h-full bg-gradient-to-b from-green-700 to-green-800 text-white w-64 p-6 shadow-2xl z-50"
      >
        <div className="flex justify-between items-center border-b border-green-600/50 pb-4">
          <div className="flex items-center gap-2">
            <FaTractor className="text-2xl text-yellow-400" />
            <h2 className="text-xl font-bold">AgriGo</h2>
          </div>
          {/* Language Selector */}
          <div className="flex items-center gap-2">
            <FaGlobe className="text-yellow-400" />
            <select 
              onChange={(e) => changeLanguage(e.target.value)}
              value={i18n.language}
              className="bg-transparent text-white outline-none cursor-pointer"
            >
              <option value="en" className="text-gray-800">English</option>
              <option value="hi" className="text-gray-800">हिंदी</option>
              <option value="mr" className="text-gray-800">मराठी</option>
            </select>
          </div>
        </div>
        <nav className="mt-8 space-y-2">
          {[
            { to: "/book-equipment", icon: <FaSearch />, label: "DASHBOARD.SEARCH_EQUIPMENT" },
            { to: "/add-equipment", icon: <FaPlus />, label: "DASHBOARD.ADD_EQUIPMENT" },
            { to: "/chatsupport", icon: <BiSupport />, label: "DASHBOARD.CHAT_SUPPORT" },
            { to: "/user-profile", icon: <CgProfile />, label: "DASHBOARD.PROFILE" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-green-600/50 group"
              aria-label={item.label}
            >
              <span className="text-green-300 group-hover:text-yellow-400">{item.icon}</span>
              <span className="font-medium">{t(item.label)}</span>
            </Link>
          ))}
        </nav>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-8 ml-0 md:ml-64">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-green-100"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-xl">
              <FaUser className="text-3xl text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{t('DASHBOARD.WELCOME')}, {userName}! 👋</h1>
              <p className="text-gray-600 mt-1">{t('DASHBOARD.ACTIVE_BOOKINGS')}: {getActiveBookingsCount()}</p>
            </div>
          </div>
        </motion.div>

        {/* Loading or Error State */}
        {loading ? (
          <p className="text-center text-gray-500 mt-6">{t('DASHBOARD.LOADING')}...</p>
        ) : error ? (
          <p className="text-center text-red-500 mt-6">{error}</p>
        ) : (
          <>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <QuickStat icon={<FaCheckCircle />} label={t('DASHBOARD.STATS.ACTIVE_BOOKINGS')} value={stats.activeBookings} />
             
              <QuickStat icon={<FaTractor />} label={t('DASHBOARD.STATS.RECEIVED_REQUESTS')} value={stats.receivedRequests} />
            </div>

            {/* Equipment You Have Taken on Rent */}
            <section className="mt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('DASHBOARD.RENTALS.TITLE')}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {rentedEquipment.map((rental) => (
                  <motion.div
                    key={rental._id}
                    className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{rental.equipment?.name}</h3>
                      <p className="text-gray-600 mt-1">{t('DASHBOARD.RENTALS.OWNER')}: {rental.equipment?.owner?.name}</p>
                      <p className="text-gray-600">{t('DASHBOARD.RENTALS.RENTAL_PERIOD')}: {new Date(rental.startDate).toLocaleDateString()} - {new Date(rental.endDate).toLocaleDateString()}</p>
                      <p className="text-gray-600">{t('DASHBOARD.RENTALS.STATUS')}: <span className={`font-semibold ${
                        rental.status === 'Confirmed' ? 'text-green-600' : 
                        rental.status === 'Pending' ? 'text-yellow-600' : 'text-blue-600'
                      }`}>{rental.status}</span></p>
                    </div>
                  </motion.div>
                ))}
                {rentedEquipment.length === 0 && (
                  <div className="col-span-2 text-center py-8 bg-white rounded-xl shadow-lg">
                    <FaTractor className="mx-auto text-4xl text-gray-300 mb-2" />
                    <p className="text-gray-500">{t('DASHBOARD.RENTALS.NO_EQUIPMENT')}</p>
                  </div>
                )}
              </div>
            </section>

            {renderRentalRequests()}
          </>
        )}

        {/* ✅ Chat Component Placed at the Bottom */}
       
      </main>
    </div>
  );
};

/** ✅ Reusable QuickStat Component */
const QuickStat = ({ icon, label, value }) => (
  <div className="bg-white rounded-xl p-6 shadow-lg border border-green-100">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-green-100 rounded-xl text-green-600">{icon}</div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  </div>
);

export default Dashboard;
