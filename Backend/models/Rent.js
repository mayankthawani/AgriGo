const mongoose = require("mongoose");

const rentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  equipment: { type: mongoose.Schema.Types.ObjectId, ref: "Equipment", required: true },
  days: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Rent", rentSchema);
