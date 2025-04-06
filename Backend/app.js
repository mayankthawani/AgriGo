const express = require('express');
const router = express.Router();
const { rateEquipment } = require('../controllers/ratingController');
const { protect } = require('../middleware/authMiddleware');

router.post('/equipment/rate/:requestId', protect, rateEquipment);

module.exports = router;

const ratingRoutes = require('./routes/ratingRoutes');
app.use('/api', ratingRoutes);