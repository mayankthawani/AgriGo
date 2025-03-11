const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  completedRentals: { type: Number, default: 0 },  // ✅ Number of rentals completed
  averageRating: { type: Number, default: 5 }, // ✅ Default rating 5
  profileCompletion: { type: Number, default: 50 }, // ✅ Example percentage

  trustScore: { type: Number, default: 50 }, // ✅ Default trust score

}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
module.exports = User;
