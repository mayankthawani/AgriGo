const mongoose = require("mongoose");

const RentalRequestSchema = new mongoose.Schema({
  equipmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Equipment", required: true },
  renterId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["pending", "approved", "rejected", "completed"], default: "pending" },
  messages: [{
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: String,
    timestamp: { type: Date, default: Date.now }
  }],
  proposedPrice: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("RentalRequest", RentalRequestSchema);
