const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/predict", authMiddleware, async (req, res) => {
  try {
    const { type, season, location } = req.body;

    // Simple AI prediction logic (you can replace this with actual ML model)
    let basePrice = 0;
    
    // Base price by equipment type
    switch (type.toLowerCase()) {
      case 'tractor':
        basePrice = 2000;
        break;
      case 'harvester':
        basePrice = 3000;
        break;
      case 'plough':
        basePrice = 1000;
        break;
      case 'seeder':
        basePrice = 1500;
        break;
      default:
        basePrice = 1000;
    }

    // Season multiplier
    const seasonMultiplier = {
      'kharif': 1.2,
      'rabi': 1.1,
      'zaid': 1.0,
      'any': 1.0
    }[season.toLowerCase()] || 1.0;

    // Calculate predicted price
    const predictedPrice = Math.round(basePrice * seasonMultiplier);

    res.json({
      success: true,
      predictedPrice,
      factors: {
        basePrice,
        seasonMultiplier
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Error predicting price",
      error: error.message 
    });
  }
});

module.exports = router;