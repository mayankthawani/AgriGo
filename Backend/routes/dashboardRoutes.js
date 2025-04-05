const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const authMiddleware = require("../middlewares/authMiddleware");
const dashboardController = require("../controllers/dashboardController"); // ✅ Ensure correct import

// Get user's bookings (equipment they have rented)
router.get("/my-rented-equipment", authMiddleware, async (req, res) => {
  try {
    // Get all active bookings for the user (Pending or Confirmed status)
    const bookings = await Booking.find({ 
      user: req.user.id,
      status: { $in: ["Pending", "Confirmed"] }
    })
    .populate({
      path: 'equipment',
      populate: {
        path: 'owner',
        select: 'name email'
      }
    })
    .sort({ createdAt: -1 });

    // Get total count of rentals
    const totalRentals = await Booking.countDocuments({ user: req.user.id });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rented equipment", error: error.message });
  }
});

// Get user's bookings
router.get("/my-bookings", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('equipment')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error: error.message });
  }
});

module.exports = router;
