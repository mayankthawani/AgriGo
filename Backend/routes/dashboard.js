const express = require("express");
const Booking = require("../models/Booking");
const Equipment = require("../models/Equipment");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

/** ✅ Fetch User's Bookings */
router.get("/my-bookings", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate("equipment");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings", error: error.message });
  }
});

/** ✅ Fetch Equipment Listed by User */
router.get("/my-equipment", authMiddleware, async (req, res) => {
  try {
    const equipment = await Equipment.find({ owner: req.user.id });
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch equipment", error: error.message });
  }
});

/** ✅ Fetch Recent Activity */
router.get("/activity", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 }).limit(5);
    const equipment = await Equipment.find({ owner: req.user.id }).sort({ createdAt: -1 }).limit(5);

    res.json({ recentBookings: bookings, recentListings: equipment });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch activity", error: error.message });
  }
});

module.exports = router;
