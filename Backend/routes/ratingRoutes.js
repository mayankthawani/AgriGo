const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Equipment = require('../models/Equipment');
const Rating = require('../models/Rating');
const RentalRequest = require('../models/RentalRequest');

// Submit a rating
router.post('/equipment/rate', auth, async (req, res) => {
  try {
    const { requestId, rating, equipmentId } = req.body;
    const userId = req.user._id;

    // Create the rating
    const newRating = await Rating.create({
      equipmentId,
      userId,
      requestId,
      rating
    });

    // Update request status and rating
    await RentalRequest.findByIdAndUpdate(requestId, {
      status: 'completed',
      rating: rating
    });

    // Calculate new average rating for equipment
    const ratings = await Rating.find({ equipmentId });
    const averageRating = ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;

    // Update equipment average rating
    await Equipment.findByIdAndUpdate(equipmentId, {
      averageRating: averageRating.toFixed(1),
      totalRatings: ratings.length
    });

    res.json({
      success: true,
      averageRating: averageRating.toFixed(1),
      message: 'Rating submitted successfully'
    });

  } catch (error) {
    console.error('Rating error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting rating'
    });
  }
});

// Get equipment ratings
router.get('/equipment/:id/ratings', auth, async (req, res) => {
  try {
    const ratings = await Rating.find({ equipmentId: req.params.id })
      .populate('userId', 'name');

    const avgRating = ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;

    res.json({
      success: true,
      ratings,
      averageRating: avgRating || 0,
      totalRatings: ratings.length
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching ratings'
    });
  }
});

module.exports = router;
