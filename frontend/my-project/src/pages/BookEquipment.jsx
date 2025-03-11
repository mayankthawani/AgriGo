import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import debounce from "lodash.debounce";
import { motion } from "framer-motion";
import { FaSearch, FaTractor, FaMapMarkerAlt, FaRupeeSign, FaUser, FaCalendarAlt, FaInfoCircle } from "react-icons/fa";

const BookEquipment = () => {
  const [equipmentList, setEquipmentList] = useState([]);  // All Equipment
  const [filteredEquipment, setFilteredEquipment] = useState([]); // Filtered Equipment
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [searchType, setSearchType] = useState("");
  const [bookingDetails, setBookingDetails] = useState({ startDate: "", endDate: "", totalDays: 0, totalPrice: 0 });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  /** 🔍 Fetch Equipment from Backend */
  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/equipment`);
        setEquipmentList(response.data);
        setFilteredEquipment(response.data); // Show all initially
      } catch (error) {
        console.error("Error fetching equipment:", error.message);
      }
    };

    fetchEquipment();
  }, []);

  /** 📝 Filter Equipment Locally */
  useEffect(() => {
    if (!searchType) {
      setFilteredEquipment(equipmentList);
    } else {
      const filtered = equipmentList.filter((equip) =>
        equip.type.toLowerCase().includes(searchType.toLowerCase())
      );
      setFilteredEquipment(filtered);
    }
  }, [searchType, equipmentList]);

  /** 📅 Calculate Total Days & Price */
  const calculateTotalDays = () => {
    if (bookingDetails.startDate && bookingDetails.endDate) {
      const start = new Date(bookingDetails.startDate);
      const end = new Date(bookingDetails.endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

      if (selectedEquipment) {
        setBookingDetails({
          ...bookingDetails,
          totalDays: days,
          totalPrice: days * selectedEquipment.pricePerDay,
        });
      }
    }
  };

  useEffect(() => {
    calculateTotalDays();
  }, [bookingDetails.startDate, bookingDetails.endDate]);

  /** 📅 Handle Booking */
  const handleBookingSubmit = async (event) => {
    event.preventDefault();
  
    if (!token) {
      alert("Please log in to book equipment.");
      navigate("/login");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/booking/book",
        {
          equipmentId: selectedEquipment._id,
          startDate: bookingDetails.startDate,
          endDate: bookingDetails.endDate,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      // ✅ Calculate Rental Duration & Total Price
      const rentalDays = Math.ceil((new Date(bookingDetails.endDate) - new Date(bookingDetails.startDate)) / (1000 * 60 * 60 * 24));
      const totalPrice = rentalDays * selectedEquipment.pricePerDay;
  
      alert("Booking successful! Redirecting to payment...");
  
      // ✅ Redirect to Payment Page with Details
      navigate(`/payment?equipmentId=${selectedEquipment._id}&days=${rentalDays}&total=${totalPrice}`);
  
    } catch (error) {
      console.error("Booking Error:", error.response?.data || error.message);
      alert("Failed to book equipment.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
            <FaTractor className="text-4xl text-green-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Book Farm Equipment</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Find and rent the perfect equipment for your farming needs</p>
        </motion.div>

        {/* Search Section */}
        <div className="relative max-w-2xl mx-auto mb-12">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search Equipment Type (e.g., Tractor, Harvester)"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="block w-full pl-10 pr-3 py-4 border-2 border-green-200 rounded-xl 
                       focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300
                       placeholder-gray-400 shadow-lg"
          />
        </div>

        {/* Equipment Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredEquipment.length > 0 ? (
            filteredEquipment.map((equip) => (
              <motion.div
                key={equip._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* Equipment Image/Icon Section */}
                <div className="relative h-48 bg-gradient-to-r from-green-500 to-green-600">
                  <FaTractor className="absolute inset-0 m-auto text-white/20 w-32 h-32" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                    <h3 className="text-2xl font-bold text-white">{equip.name}</h3>
                  </div>
                </div>

                {/* Equipment Details */}
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <DetailItem icon={<FaTractor />} label="Type" value={equip.type} />
                    <DetailItem icon={<FaUser />} label="Owner" value={equip.owner?.name || "Unknown"} />
                    <DetailItem icon={<FaMapMarkerAlt />} label="Location" value={equip.location} />
                    <DetailItem 
                      icon={<FaRupeeSign />} 
                      label="Price/Day" 
                      value={`₹${equip.pricePerDay}`}
                      highlight={true}
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedEquipment(equip)}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-xl hover:bg-green-700 
                             transition-all duration-300 flex items-center justify-center gap-2 font-semibold"
                  >
                    <FaCalendarAlt />
                    Book Now
                  </motion.button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-500">
              <FaSearch className="w-16 h-16 mb-4 text-gray-300" />
              <p className="text-xl">No equipment found matching your search.</p>
              <p className="mt-2">Try adjusting your search terms.</p>
            </div>
          )}
        </motion.div>

        {/* Booking Modal */}
        {selectedEquipment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-100 rounded-full">
                  <FaTractor className="text-2xl text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Book Equipment</h2>
              </div>

              <div className="space-y-4">
                <DetailItem icon={<FaTractor />} label="Equipment" value={selectedEquipment.name} />
                <DetailItem 
                  icon={<FaRupeeSign />} 
                  label="Price per Day" 
                  value={`₹${selectedEquipment.pricePerDay}`} 
                  highlight={true}
                />

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={bookingDetails.startDate}
                    onChange={(e) => setBookingDetails({ ...bookingDetails, startDate: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={bookingDetails.endDate}
                    onChange={(e) => setBookingDetails({ ...bookingDetails, endDate: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="bg-green-50 p-4 rounded-xl">
                  <DetailItem 
                    icon={<FaCalendarAlt />} 
                    label="Total Days" 
                    value={bookingDetails.totalDays}
                  />
                  <DetailItem 
                    icon={<FaRupeeSign />} 
                    label="Total Price" 
                    value={`₹${bookingDetails.totalPrice}`}
                    highlight={true}
                  />
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setSelectedEquipment(null)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBookingSubmit}
                    className="flex-1 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
                  >
                    Confirm Booking
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const DetailItem = ({ icon, label, value, highlight }) => (
  <div className="flex items-center gap-2">
    <div className={`${highlight ? 'text-green-600' : 'text-gray-400'}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`font-semibold ${highlight ? 'text-green-600 text-lg' : 'text-gray-700'}`}>
        {value}
      </p>
    </div>
  </div>
);

export default BookEquipment;
