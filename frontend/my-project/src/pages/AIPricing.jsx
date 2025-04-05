import React, { useState } from 'react';
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { FaTractor, FaRupeeSign, FaCalculator, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

const AIPricing = () => {
  const [formData, setFormData] = useState({
    equipmentType: '',
    rentalDuration: '',
    location: '',
  });
  const [loading, setLoading] = useState(false);
  const [predictedPrice, setPredictedPrice] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/ai/pricing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setPredictedPrice(data.predictedPrice);
    } catch (error) {
      console.error('Error fetching AI pricing:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block p-4 bg-green-100 rounded-full mb-4"
          >
            <FaCalculator className="text-4xl text-green-600" />
          </motion.div>
          <Typography variant="h3" className="font-bold text-gray-800 mb-4">
            AI-Powered Price Estimation
          </Typography>
          <Typography variant="body1" className="text-gray-600 max-w-2xl mx-auto">
            Get accurate equipment rental prices based on market data, location, and seasonal demand
          </Typography>
        </div>

        {/* Main Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-8">
            <Box component="form" onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <FaTractor className="absolute top-1/2 left-4 transform -translate-y-1/2 text-green-500" />
                <TextField
                  label="Equipment Type"
                  name="equipmentType"
                  variant="outlined"
                  fullWidth
                  value={formData.equipmentType}
                  onChange={handleChange}
                  required
                  className="pl-12"
                  InputProps={{
                    className: "pl-10",
                    sx: {
                      borderRadius: '0.75rem',
                      '&:hover': {
                        borderColor: '#059669',
                      },
                    }
                  }}
                />
              </div>

              <div className="relative">
                <FaCalendarAlt className="absolute top-1/2 left-4 transform -translate-y-1/2 text-green-500" />
                <TextField
                  label="Rental Duration (days)"
                  name="rentalDuration"
                  variant="outlined"
                  fullWidth
                  value={formData.rentalDuration}
                  onChange={handleChange}
                  required
                  type="number"
                  InputProps={{
                    className: "pl-10",
                    sx: {
                      borderRadius: '0.75rem',
                    }
                  }}
                />
              </div>

              <div className="relative">
                <FaMapMarkerAlt className="absolute top-1/2 left-4 transform -translate-y-1/2 text-green-500" />
                <TextField
                  label="Location"
                  name="location"
                  variant="outlined"
                  fullWidth
                  value={formData.location}
                  onChange={handleChange}
                  required
                  InputProps={{
                    className: "pl-10",
                    sx: {
                      borderRadius: '0.75rem',
                    }
                  }}
                />
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700 py-3 rounded-xl text-lg font-semibold"
                  sx={{
                    textTransform: 'none',
                    borderRadius: '0.75rem',
                    padding: '0.75rem',
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} className="text-white" />
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <FaCalculator /> Calculate Price
                    </span>
                  )}
                </Button>
              </motion.div>
            </Box>

            {/* Price Result */}
            {predictedPrice !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 bg-green-50 rounded-xl"
              >
                <div className="flex items-center justify-center gap-4">
                  <FaRupeeSign className="text-3xl text-green-600" />
                  <div className="text-center">
                    <Typography variant="subtitle1" className="text-green-600 font-medium">
                      Estimated Price
                    </Typography>
                    <Typography variant="h4" className="font-bold text-gray-800">
                      ₹{predictedPrice}
                    </Typography>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <FeatureCard
            icon={<FaCalculator />}
            title="AI-Powered"
            description="Advanced algorithms for accurate pricing"
          />
          <FeatureCard
            icon={<FaMapMarkerAlt />}
            title="Location-Based"
            description="Prices adjusted to your location"
          />
          <FeatureCard
            icon={<FaCalendarAlt />}
            title="Seasonal Trends"
            description="Considers seasonal demand variations"
          />
        </div>
      </motion.div>
    </Box>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-xl shadow-md"
  >
    <div className="text-green-500 mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

export default AIPricing;
