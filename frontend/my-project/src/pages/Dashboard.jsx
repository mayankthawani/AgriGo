import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next"; // ✅ Import i18n hook
import { 
  FaSearch, FaPlus, FaBars, FaTimes, FaCheckCircle, FaClock, 
  FaTractor, FaUser, FaCalendarAlt 
} from "react-icons/fa";
import { GrMoney } from "react-icons/gr";
import { BiSupport } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

const Dashboard = () => {
  const { t } = useTranslation(); // ✅ Initialize translations
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userName, setUserName] = useState("User");
  const [bookings, setBookings] = useState([]);
  const [rentedEquipment, setRentedEquipment] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
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
        const [bookingsRes, equipmentRes] = await Promise.all([
          axios.get("http://localhost:5000/api/dashboard/my-bookings", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/dashboard/my-equipment", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setBookings(bookingsRes.data);
        setRentedEquipment(equipmentRes.data);
        setPendingRequests(bookingsRes.data.filter((booking) => booking.status === "Pending"));
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: sidebarOpen ? 0 : -250 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-green-700 to-green-800 text-white w-64 p-6 shadow-2xl z-50 ${
          sidebarOpen ? "block" : "hidden md:block"
        }`}
      >
        <div className="flex justify-between items-center border-b border-green-600/50 pb-4">
          <div className="flex items-center gap-2">
            <FaTractor className="text-2xl text-yellow-400" />
            <h2 className="text-xl font-bold">{t("dashboard.title")}</h2>
          </div>
          <FaTimes className="md:hidden cursor-pointer hover:text-gray-300" onClick={() => setSidebarOpen(false)} />
        </div>
        <nav className="mt-8 space-y-2">
          {[
            { to: "/book-equipment", icon: <FaSearch />, label: t("dashboard.searchEquipment") },
            { to: "/add-equipment", icon: <FaPlus />, label: t("dashboard.addEquipment") },
            { to: "/ai-pricing", icon: <GrMoney />, label: t("dashboard.aiPricing") },
            { to: "/chatsupport", icon: <BiSupport />, label: t("dashboard.chatSupport") },
            { to: "/user-profile", icon: <CgProfile />, label: t("dashboard.profile") },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-green-600/50 group"
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
              <h1 className="text-3xl font-bold text-gray-800">{t("dashboard.welcome")}, {userName}! 👋</h1>
              <p className="text-gray-600 mt-1">{t("dashboard.activeBookings")}: {bookings.length}</p>
            </div>
          </div>
        </motion.div>

        {/* Loading Indicator */}
        {loading ? (
          <p className="text-center text-gray-500 mt-6">{t("loading")}</p>
        ) : (
          <>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <QuickStat icon={<FaCheckCircle />} label={t("dashboard.activeBookings")} value={bookings.length} />
              <QuickStat icon={<FaCalendarAlt />} label={t("dashboard.totalRentals")} value={rentedEquipment.length} />
              <QuickStat icon={<FaTractor />} label={t("dashboard.availableEquipment")} value="15+" />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

/** ✅ **QuickStat Component (Fixed)** */
const QuickStat = ({ icon, label, value }) => (
  <div className="bg-white rounded-xl p-6 shadow-lg border border-green-100">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-green-100 rounded-xl text-green-600">{icon}</div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  </div>
);

export default Dashboard;
