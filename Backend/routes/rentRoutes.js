const express = require("express");
const router = express.Router();
const Rent = require("../models/Rent");
const Equipment = require("../models/Equipment");
const authMiddleware = require("../middlewares/authMiddleware");

// Rent Equipment
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { equipmentId, days } = req.body;
    const userId = req.user.id;

    const equipment = await Equipment.findById(equipmentId);
    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    const rental = new Rent({
      user: userId,
      equipment: equipmentId,
      days,
      totalAmount: equipment.pricePerDay * days,
    });

    await rental.save();

    res.status(201).json({ message: "Equipment rented successfully!", rental });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
