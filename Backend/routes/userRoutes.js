const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/User");

// ✅ **Fetch User Profile with Trust Score**
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ **Calculate Trust Score**
    const trustScore = (user.completedRentals * 10) + (user.averageRating * 20) + user.profileCompletion;

    res.json({ 
      name: user.name,
      email: user.email,
      completedRentals: user.completedRentals,
      averageRating: user.averageRating,
      profileCompletion: user.profileCompletion,
      trustScore // ✅ Send trust score to frontend
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
