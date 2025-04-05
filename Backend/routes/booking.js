const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// Book Equipment
router.post("/book", authMiddleware, async (req, res) => {
  const { equipmentId, startDate, endDate } = req.body;
  try {
    const booking = new Booking({
      userId: req.user.id,
      equipmentId,
      startDate,
      endDate,
      status: "Pending",
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch Bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).populate("equipmentId");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
