const express = require("express");
const router = express.Router();
const Rental = require("../models/Rental");
const Equipment = require("../models/Equipment");
const auth = require("../middleware/auth");

// POST: Rent Equipment
router.post("/", auth, async (req, res) => {
  try {
    const { equipmentId, startDate, endDate } = req.body;
    const userId = req.user.id;

    // Check if equipment exists
    const equipment = await Equipment.findById(equipmentId);
    if (!equipment) return res.status(404).json({ message: "Equipment not found" });

    // Check availability
    const existingRentals = await Rental.find({
      equipmentId,
      $or: [
        { startDate: { $lte: endDate }, endDate: { $gte: startDate } }, // Overlapping dates
      ],
    });

    if (existingRentals.length > 0) {
      return res.status(400).json({ message: "Equipment is already rented for the selected dates" });
    }

    // Create rental record
    const rental = new Rental({ userId, equipmentId, startDate, endDate });
    await rental.save();

    res.status(201).json({ message: "Rental request successful!", rental });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

