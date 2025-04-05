import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaSearch, FaTractor, FaMapMarkerAlt, FaRupeeSign, FaUser, FaCalendarAlt } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import '../i18n';

const SearchEquipment = () => {
  const { t } = useTranslation();
  const [equipments, setEquipments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/equipment");
        setEquipments(response.data);
      } catch (error) {
        console.error("Error fetching equipment:", error.message);
      }
    };
    fetchEquipment();
  }, []);

  const handleRent = (equipment) => {
    const days = prompt("Enter number of days to rent:");
    if (!days || isNaN(days) || days <= 0) {
      alert("Please enter a valid number of days.");
      return;
    }

    const totalPrice = equipment.pricePerDay * parseInt(days);
    
    navigate(`/payment?equipmentId=${equipment._id}&days=${days}&total=${totalPrice}`);
  };

  const filteredEquipment = equipments.filter((equip) =>
    equip.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl font-bold text-green-800 mb-4">{t('FIND_EQUIPMENT')}</h2>
          <p className="text-gray-600">{t('BROWSE_EQUIPMENT')}</p>
        </motion.div>

        {/* Search Box */}
        <div className="relative max-w-2xl mx-auto mb-12">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={t('SEARCH_EQUIPMENT_PLACEHOLDER')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 outline-none shadow-lg"
          />
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipment.length > 0 ? (
            filteredEquipment.map((equip) => (
              <motion.div
                key={equip._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 bg-green-100">
                  <FaTractor className="absolute inset-0 m-auto text-green-300 w-24 h-24" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{equip.name}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <FaTractor className="w-5 h-5 mr-2 text-green-500" />
                      <span>{equip.type}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaUser className="w-5 h-5 mr-2 text-green-500" />
                      <span>{equip.owner?.name || t('UNKNOWN_OWNER')}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaMapMarkerAlt className="w-5 h-5 mr-2 text-green-500" />
                      <span>{equip.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaRupeeSign className="w-5 h-5 mr-2 text-green-500" />
                      <span className="text-lg font-semibold text-green-600">{equip.pricePerDay}/{t('DAY')}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRent(equip)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <FaCalendarAlt />
                    {t('RENT_NOW')}
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <FaSearch className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">{t('NO_EQUIPMENT_FOUND')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchEquipment;
