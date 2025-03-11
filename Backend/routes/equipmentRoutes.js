const express = require("express");
const router = express.Router();
const Equipment = require("../models/Equipment");
const authMiddleware = require("../middlewares/authMiddleware");

// Add Equipment
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, type, description, pricePerDay, location, availability } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const newEquipment = new Equipment({
      name,
      type,
      description,
      pricePerDay,
      location,
      availability,
      owner: req.user.id, // Link to user
    });

    await newEquipment.save();
    res.status(201).json({ message: "Equipment added successfully!", equipment: newEquipment });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch All Equipment
// Fetch All Equipment (with owner details)
router.get("/", async (req, res) => {
  try {
    const equipmentList = await Equipment.find().populate("owner", "name email");
    res.json(equipmentList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
