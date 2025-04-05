const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Equipment = require("../models/Equipment");
const RentalRequest = require("../models/RentalRequest"); // Add this import
const authMiddleware = require("../middlewares/authMiddleware");

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/documents')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.pdf', '.jpg', '.jpeg', '.png'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// Add Equipment with document upload
router.post("/", authMiddleware, upload.fields([
  { name: 'registrationDoc', maxCount: 1 },
  { name: 'insuranceDoc', maxCount: 1 }
]), async (req, res) => {
  try {
    const equipmentData = {
      ...req.body,
      owner: req.user.id
    };

    // Add document paths if files were uploaded
    if (req.files) {
      equipmentData.documents = {};
      if (req.files.registrationDoc) {
        equipmentData.documents.registrationDoc = req.files.registrationDoc[0].path;
      }
      if (req.files.insuranceDoc) {
        equipmentData.documents.insuranceDoc = req.files.insuranceDoc[0].path;
      }
    }

    const newEquipment = new Equipment(equipmentData);
    await newEquipment.save();

    res.status(201).json({ 
      success: true,
      message: "Equipment added successfully!", 
      equipment: newEquipment 
    });
  } catch (error) {
    console.error('Equipment creation error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message || "Failed to add equipment" 
    });
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

// Send Rental Request
router.post("/:equipmentId/request", authMiddleware, async (req, res) => {
  try {
    const { message, proposedPrice } = req.body;
    const equipment = await Equipment.findById(req.params.equipmentId).populate('owner');
    
    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    const newRequest = new RentalRequest({
      equipmentId: equipment._id,
      renterId: req.user.id,
      ownerId: equipment.owner._id,
      message,
      proposedPrice,
    });

    await newRequest.save();
    res.status(201).json({ message: "Rental request sent successfully", request: newRequest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Rental Requests (for equipment owner)
router.get("/rental-requests/received", authMiddleware, async (req, res) => {
  try {
    const requests = await RentalRequest.find({ ownerId: req.user.id })
      .populate('equipmentId')
      .populate('renterId', 'name email');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get My Sent Rental Requests
router.get("/rental-requests/sent", authMiddleware, async (req, res) => {
  try {
    const requests = await RentalRequest.find({ renterId: req.user.id })
      .populate('equipmentId')
      .populate('ownerId', 'name email');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Rental Request Status
router.patch("/rental-requests/:requestId", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    console.log('Updating request:', req.params.requestId, 'to status:', status); // Debug log

    const request = await RentalRequest.findById(req.params.requestId);
    
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Convert ObjectId to string for comparison
    const ownerId = request.ownerId.toString();
    const userId = req.user.id.toString();

    if (ownerId !== userId) {
      return res.status(403).json({ message: "Unauthorized to update this request" });
    }

    request.status = status;
    const updatedRequest = await request.save();

    // Populate necessary fields before sending response
    const populatedRequest = await RentalRequest.findById(updatedRequest._id)
      .populate('equipmentId')
      .populate('renterId', 'name email')
      .populate('ownerId', 'name email');

    res.json({
      success: true,
      message: `Request ${status} successfully`,
      request: populatedRequest
    });

  } catch (error) {
    console.error('Error updating request:', error); // Debug log
    res.status(500).json({ 
      success: false, 
      message: "Failed to update request status",
      error: error.message 
    });
  }
});

// Add Message to Rental Request
router.post("/rental-requests/:requestId/messages", authMiddleware, async (req, res) => {
  try {
    const { content } = req.body;
    const request = await RentalRequest.findById(req.params.requestId);
    
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.messages.push({
      sender: req.user.id,
      content
    });

    await request.save();
    res.json({ message: "Message sent successfully", request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Messages for a Request
router.get("/rental-requests/:requestId/messages", authMiddleware, async (req, res) => {
  try {
    const request = await RentalRequest.findById(req.params.requestId)
      .populate('messages.sender', 'name');
    
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Check if user is part of this request
    if (request.renterId.toString() !== req.user.id && 
        request.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to view these messages" });
    }

    const messages = request.messages.map(msg => ({
      content: msg.content,
      sender: msg.sender.name,
      timestamp: msg.timestamp,
      isOwn: msg.sender._id.toString() === req.user.id
    }));

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add Message to a Request
router.post("/rental-requests/:requestId/messages", authMiddleware, async (req, res) => {
  try {
    const { content } = req.body;
    const request = await RentalRequest.findById(req.params.requestId);
    
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Check if user is part of this request
    if (request.renterId.toString() !== req.user.id && 
        request.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to send messages" });
    }

    request.messages.push({
      sender: req.user.id,
      content
    });

    await request.save();
    res.json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Request Details
router.get("/rental-requests/:requestId", authMiddleware, async (req, res) => {
  try {
    const request = await RentalRequest.findById(req.params.requestId)
      .populate('equipmentId', 'name')
      .populate('renterId', 'name email')
      .populate('ownerId', 'name email');
    
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Determine who the other farmer is based on the current user
    const isRenter = request.renterId._id.toString() === req.user.id;
    const otherFarmer = isRenter ? request.ownerId : request.renterId;

    res.json({
      request,
      otherFarmer: {
        name: otherFarmer.name,
        email: otherFarmer.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching request details", error: error.message });
  }
});

module.exports = router;
