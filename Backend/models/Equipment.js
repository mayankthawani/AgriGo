const mongoose = require("mongoose");

const EquipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  pricePerDay: { type: Number, required: true },
  location: { type: String, required: true },
  season: { type: String, enum: ["Kharif", "Rabi", "Zaid", "Any"], required: true },
  availability: { type: Boolean, default: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  vehicleDetails: {
    registrationNumber: { type: String, required: true },
    manufacturer: { type: String, required: true },
    model: { type: String, required: true },
    yearOfManufacture: { type: Number, required: true }
  },
  documents: {
    registrationDoc: { type: String },
    insuranceDoc: { type: String }
  }
}, { timestamps: true });

module.exports = mongoose.model("Equipment", EquipmentSchema);
