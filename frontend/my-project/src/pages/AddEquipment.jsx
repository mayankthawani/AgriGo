import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaTractor, FaUpload, FaMoneyBillWave, FaMapMarkerAlt, FaClipboardList, FaImage } from "react-icons/fa";

const AddEquipment = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    pricePerDay: "",
    location: "",
    availability: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Authentication failed. Please log in again.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/equipment",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Equipment added successfully!");
    } catch (error) {
      console.error("Error:", error.response?.data?.message || error.message);
      alert("Failed to add equipment: " + (error.response?.data?.message || "Unknown error"));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="md:flex">
          {/* Left Section - Form */}
          <div className="md:flex-1 p-8">
            <div className="flex items-center mb-8">
              <FaTractor className="text-4xl text-green-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-800">Add Equipment</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-6">
                {/* Name Input */}
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Equipment Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                    placeholder="e.g., John Deere Tractor"
                    required
                  />
                </div>

                {/* Type Input */}
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Equipment Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Tractor">Tractor</option>
                    <option value="Harvester">Harvester</option>
                    <option value="Plough">Plough</option>
                    <option value="Seeder">Seeder</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Description Input */}
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                    rows="4"
                    placeholder="Describe your equipment's features and condition..."
                    required
                  ></textarea>
                </div>

                {/* Price Input */}
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Price Per Day (₹)</label>
                  <div className="relative">
                    <FaMoneyBillWave className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      name="pricePerDay"
                      value={formData.pricePerDay}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                {/* Location Input */}
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Location</label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                      placeholder="Enter location"
                      required
                    />
                  </div>
                </div>

                {/* Availability Toggle */}
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="availability"
                    checked={formData.availability}
                    onChange={handleChange}
                    className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label className="text-sm font-medium text-gray-700">Available for Rent</label>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition duration-200 flex items-center justify-center space-x-2"
              >
                <FaUpload />
                <span>Add Equipment</span>
              </motion.button>
            </form>
          </div>

          {/* Right Section - Preview/Tips */}
          <div className="md:w-1/3 bg-green-50 p-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Tips</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start space-x-2">
                <FaImage className="mt-1 text-green-500" />
                <span>Add clear, high-quality images of your equipment</span>
              </li>
              <li className="flex items-start space-x-2">
                <FaClipboardList className="mt-1 text-green-500" />
                <span>Provide detailed descriptions including specifications</span>
              </li>
              <li className="flex items-start space-x-2">
                <FaMoneyBillWave className="mt-1 text-green-500" />
                <span>Set competitive daily rental rates</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AddEquipment;
