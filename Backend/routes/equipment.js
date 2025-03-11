const express = require("express");
const Equipment = require("../models/Equipment"); // Import the Equipment model
const authMiddleware = require("../middlewares/authMiddleware"); // Ensure authentication

const router = express.Router();

/** ✅ Add Equipment */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, type, price } = req.body; // Add required fields

    const newEquipment = new Equipment({
      name,
      type,
      price,
      owner: req.user.id, // Get owner ID from the token
    });

    await newEquipment.save();
    res.status(201).json({ success: true, message: "Equipment added successfully!", equipment: newEquipment });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add equipment", error: error.message });
  }
});

module.exports = router;
