import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaPlus, FaBars, FaTimes, FaCheckCircle, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";

const Dashboard = () => {
  const userName = "Mayank"; // Replace with dynamic user data
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const bookings = [
    { id: 1, equipment: "Tractor", period: "March 12 - March 15", status: "Confirmed" },
    { id: 2, equipment: "Harvester", period: "March 20 - March 22", status: "Pending" },
  ];
  
  const rentedEquipment = [
    { id: 1, equipment: "Plow", period: "March 5 - March 10", status: "Completed" },
    { id: 2, equipment: "Seeder", period: "February 25 - February 28", status: "Completed" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -250 }} 
        animate={{ x: sidebarOpen ? 0 : -250 }} 
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 h-full bg-green-600 text-white w-64 p-6 shadow-lg z-50 ${sidebarOpen ? "block" : "hidden md:block"}`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <FaTimes className="md:hidden cursor-pointer" onClick={() => setSidebarOpen(false)} />
        </div>
        <nav className="mt-6 space-y-4">
          <Link to="/search-equipment" className="flex items-center gap-3 hover:text-gray-300">
            <FaSearch /> Search Equipment
          </Link>
          <Link to="/add-equipment" className="flex items-center gap-3 hover:text-gray-300">
            <FaPlus /> Add Equipment
          </Link>
        </nav>
      </motion.aside>

      {/* Sidebar Toggle Button (Mobile) */}
      <button
        className="absolute top-4 left-4 md:hidden bg-green-600 text-white p-3 rounded-full shadow-lg"
        onClick={() => setSidebarOpen(true)}
      >
        <FaBars size={20} />
      </button>

      {/* Main Content */}
      <main className="flex-1 p-6 ml-0 md:ml-64">
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <h1 className="text-3xl font-bold">Welcome back, {userName}! 👋</h1>
          <p className="text-gray-600 mt-2">You have {bookings.length} active bookings.</p>
        </motion.div>

        {/* Bookings Section */}
        <section className="mt-6">
          <h2 className="text-xl font-bold mb-4">Your Bookings</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white p-6 rounded-xl shadow-md border-l-4"
                style={{ borderColor: booking.status === "Confirmed" ? "#10B981" : "#F59E0B" }}
              >
                <h3 className="text-lg font-bold">{booking.equipment}</h3>
                <p className="text-gray-600">Rental Period: {booking.period}</p>
                <div className="mt-2 flex items-center gap-2">
                  {booking.status === "Confirmed" ? (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <FaCheckCircle /> Confirmed
                    </span>
                  ) : (
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <FaClock /> Pending
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Rented Equipment Section */}
        <section className="mt-6">
          <h2 className="text-xl font-bold mb-4">Rented Equipment</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {rentedEquipment.map((equipment) => (
              <motion.div
                key={equipment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500"
              >
                <h3 className="text-lg font-bold">{equipment.equipment}</h3>
                <p className="text-gray-600">Rental Period: {equipment.period}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    ✅ Completed
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
