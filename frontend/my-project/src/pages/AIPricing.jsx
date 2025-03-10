import React, { useState } from 'react';
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material';

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
    <Box sx={{ backgroundColor: '#f9fafb', textAlign: 'center', py: 8 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        AI-Driven Pricing Estimates
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Get dynamic pricing based on real-time demand and supply.
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
        <TextField
          label="Equipment Type"
          name="equipmentType"
          variant="outlined"
          fullWidth
          value={formData.equipmentType}
          onChange={handleChange}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          label="Rental Duration (days)"
          name="rentalDuration"
          variant="outlined"
          fullWidth
          value={formData.rentalDuration}
          onChange={handleChange}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          label="Location"
          name="location"
          variant="outlined"
          fullWidth
          value={formData.location}
          onChange={handleChange}
          sx={{ mb: 2 }}
          required
        />
        <Button type="submit" variant="contained" color="success" fullWidth disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Estimate Price'}
        </Button>
      </Box>
      {predictedPrice !== null && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" fontWeight="bold">
            Estimated Price: ${predictedPrice}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default AIPricing;
