const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Equipment = require("../models/Equipment");
const RentalRequest = require("../models/RentalRequest");
const User = require("../models/User");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/book", authMiddleware, async (req, res) => {
  try {
    const { equipmentId, startDate, endDate, requestId, amount } = req.body;

    if (!equipmentId || !startDate || !endDate) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required booking details" 
      });
    }

    // Check if equipment exists and is available
    const equipment = await Equipment.findById(equipmentId);
    if (!equipment) {
      return res.status(404).json({ 
        success: false, 
        message: "Equipment not found" 
      });
    }

    if (!equipment.availability) {
      return res.status(400).json({ 
        success: false, 
        message: "Equipment is not available" 
      });
    }

    // Create booking
    const newBooking = new Booking({
      user: req.user.id,
      equipment: equipmentId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      status: "Confirmed",
    });

    await newBooking.save();

    // Update equipment availability
    equipment.availability = false;
    await equipment.save();

    // If there's a rental request, update its status
    if (requestId) {
      await RentalRequest.findByIdAndUpdate(requestId, { 
        status: "completed" 
      });
    }

    res.status(201).json({
      success: true,
      message: "Payment successful and booking confirmed",
      booking: newBooking
    });

  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to complete rental", 
      error: error.message 
    });
  }
});

/** ✅ **Get User's Bookings (Rentals)** */
router.get("/my-bookings", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("equipment", "name type location owner") // Get equipment details
      .populate("owner", "name email"); // Get owner details
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch bookings", error: error.message });
  }
});

/** ✅ **Get Equipment Owner's Received Bookings** */
router.get("/rented-equipment", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate({
        path: "equipment",
        match: { owner: req.user.id }, // Find only equipment owned by logged-in user
        select: "name location",
      })
      .populate("user", "name email"); // Get renter details

    res.status(200).json(bookings.filter((b) => b.equipment !== null)); // Remove null equipment
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch rented equipment", error: error.message });
  }
});

/** ✅ **Confirm a Booking** */
router.put("/confirm/:bookingId", authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId).populate("equipment");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Only allow confirmation by the equipment owner
    if (booking.equipment.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to confirm this booking" });
    }

    booking.status = "Confirmed";
    await booking.save();

    res.status(200).json({ success: true, message: "Booking confirmed successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Failed to confirm booking", error: error.message });
  }
});

/** ✅ **Submit Rating** */
router.post("/:bookingId/rate", authMiddleware, async (req, res) => {
  try {
    const { rating } = req.body;
    const { bookingId } = req.params;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5." });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only rate your own completed rentals." });
    }

    if (booking.status !== "Completed") {
      return res.status(400).json({ message: "You can only rate completed bookings." });
    }

    booking.rating = rating;
    await booking.save();

    // ✅ Update the owner's average rating
    const owner = await User.findById(booking.equipment.owner);
    const allRatings = await Booking.find({ "equipment.owner": owner._id, rating: { $ne: null } });

    const totalRatings = allRatings.reduce((acc, b) => acc + b.rating, 0);
    owner.averageRating = totalRatings / allRatings.length;
    await owner.save();

    res.json({ success: true, message: "Rating submitted successfully!" });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
