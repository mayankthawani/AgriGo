import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaStar, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaCheckCircle, FaTractor, FaCalendarAlt } from "react-icons/fa";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {!user ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-green-100 flex items-center justify-center">
                      <FaUser className="w-16 h-16 text-green-500" />
                    </div>
                    {user.verified && (
                      <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-2">
                        <FaCheckCircle className="text-white text-xl" />
                      </div>
                    )}
                  </div>
                  <h2 className="mt-4 text-2xl font-bold text-gray-800">{user.name}</h2>
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        className={`w-5 h-5 ${
                          index < Math.round(user.averageRating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-gray-600">({user.totalRatings || 0} reviews)</span>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <ProfileInfoItem icon={<FaEnvelope />} label="Email" value={user.email} />
                  <ProfileInfoItem icon={<FaPhone />} label="Phone" value={user.phone || "Not added"} />
                  <ProfileInfoItem icon={<FaMapMarkerAlt />} label="Location" value={user.location || "Not specified"} />
                  <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300">
                    <FaEdit /> Edit Profile
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Stats & Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <StatsCard icon={<FaTractor />} label="Equipment Listed" value="12" />
                <StatsCard icon={<FaCalendarAlt />} label="Total Rentals" value="45" />
                <StatsCard icon={<FaStar />} label="Average Rating" value={`${user.averageRating}/5`} />
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {user.recentActivity?.map((activity, index) => (
                    <ActivityItem key={index} activity={activity} />
                  )) || (
                    <p className="text-gray-500 text-center py-4">No recent activity</p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

const ProfileInfoItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 text-gray-600">
    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-500">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

const StatsCard = ({ icon, label, value }) => (
  <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-500">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  </div>
);

const ActivityItem = ({ activity }) => (
  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-500">
      <FaCheckCircle />
    </div>
    <div>
      <p className="text-gray-800">{activity.description}</p>
      <p className="text-sm text-gray-500">{activity.date}</p>
    </div>
  </div>
);

export default UserProfile;
