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
} from "react-icons/fa";
import { GrMoney } from "react-icons/gr";
import { BiSupport } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import Chat from "../components/Chat";  // ✅ Import Chat Component
import RequestChat from '../components/RequestChat';  // Add this import at the top

const Dashboard = () => {
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

  const getActiveBookingsCount = () => {
    return rentedEquipment.filter(rental => 
      rental.status === "Confirmed" || rental.status === "Pending"
    ).length;
  };

  const renderRentalRequests = () => (
    <section className="mt-8">
      {/* Received Requests */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Received Rental Requests</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {rentalRequests.received?.map((request) => (
            <motion.div
              key={request._id}
              className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500"
            >
              <h3 className="text-xl font-bold text-gray-800">{request.equipmentId?.name}</h3>
              <div className="mt-2 space-y-2">
                <p className="text-gray-600">From: {request.renterId?.name}</p>
                <p className="text-gray-600">Email: {request.renterId?.email}</p>
                <p className="text-gray-600">Proposed Price: ₹{request.proposedPrice}/day</p>
                <p className="text-gray-600">Status: {request.status}</p>
                {request.message && (
                  <p className="text-gray-600">Message: {request.message}</p>
                )}
              </div>
              
              {request.status === "pending" && (
                <div className="mt-4 flex gap-2">
                  <button 
                    onClick={() => handleRequestResponse(request._id, "approved")}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Accept
                  </button>
                  <button 
                    onClick={() => handleRequestResponse(request._id, "rejected")}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Reject
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
                <p className="mt-4 text-red-500">Request rejected</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sent Requests */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Sent Rental Requests</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {rentalRequests.sent?.map((request) => (
            <motion.div
              key={request._id}
              className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500"
            >
              <h3 className="text-xl font-bold text-gray-800">{request.equipmentId?.name}</h3>
              <p className="text-gray-600">Owner: {request.ownerId?.name}</p>
              <p className="text-gray-600">Proposed Price: ₹{request.proposedPrice}/day</p>
              <p className="text-gray-600">Status: {request.status}</p>
              {request.message && (
                <p className="text-gray-600 mt-2">Message: {request.message}</p>
              )}
              {request.status === "approved" && (
                <button
                  onClick={() => navigate(`/farmer-chat/${request._id}`)}
                  className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Chat with Farmer
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

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
            <h2 className="text-xl font-bold">Dashboard</h2>
          </div>
        </div>
        <nav className="mt-8 space-y-2">
          {[
            { to: "/book-equipment", icon: <FaSearch />, label: "Search Equipment" },
            { to: "/add-equipment", icon: <FaPlus />, label: "Add Equipment" },
           
            { to: "/chatsupport", icon: <BiSupport />, label: "Chat Support" },
            { to: "/user-profile", icon: <CgProfile />, label: "Profile" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-green-600/50 group"
              aria-label={item.label}
            >
              <span className="text-green-300 group-hover:text-yellow-400">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
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
              <h1 className="text-3xl font-bold text-gray-800">Welcome, {userName}! 👋</h1>
              <p className="text-gray-600 mt-1">Active Bookings: {getActiveBookingsCount()}</p>
            </div>
          </div>
        </motion.div>

        {/* Loading or Error State */}
        {loading ? (
          <p className="text-center text-gray-500 mt-6">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500 mt-6">{error}</p>
        ) : (
          <>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <QuickStat icon={<FaCheckCircle />} label="Active Bookings" value={stats.activeBookings} />
             
              <QuickStat icon={<FaTractor />} label="Rental Requests" value={stats.receivedRequests} />
            </div>

            {/* Equipment You Have Taken on Rent */}
            <section className="mt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Rented Equipment</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {rentedEquipment.map((rental) => (
                  <motion.div
                    key={rental._id}
                    className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{rental.equipment?.name}</h3>
                      <p className="text-gray-600 mt-1">Owner: {rental.equipment?.owner?.name}</p>
                      <p className="text-gray-600">Rental Period: {new Date(rental.startDate).toLocaleDateString()} - {new Date(rental.endDate).toLocaleDateString()}</p>
                      <p className="text-gray-600">Status: <span className={`font-semibold ${
                        rental.status === 'Confirmed' ? 'text-green-600' : 
                        rental.status === 'Pending' ? 'text-yellow-600' : 'text-blue-600'
                      }`}>{rental.status}</span></p>
                    </div>
                  </motion.div>
                ))}
                {rentedEquipment.length === 0 && (
                  <div className="col-span-2 text-center py-8 bg-white rounded-xl shadow-lg">
                    <FaTractor className="mx-auto text-4xl text-gray-300 mb-2" />
                    <p className="text-gray-500">No equipment currently rented</p>
                  </div>
                )}
              </div>
            </section>

            {renderRentalRequests()}
          </>
        )}

        {/* ✅ Chat Component Placed at the Bottom */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Chat with your co-farmers</h2>
          <Chat />  {/* ✅ Correct Placement */}
        </section>
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
