const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Who booked
  equipment: { type: mongoose.Schema.Types.ObjectId, ref: "Equipment", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ["Pending", "Confirmed", "Completed"], default: "Pending" },
  rating: { type: Number, min: 1, max: 5, default: null }, // ⭐ Rating (1-5)
}, { timestamps: true });

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;
