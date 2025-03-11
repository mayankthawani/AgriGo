const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const equipmentRoutes = require("./routes/equipmentRoutes");
const rentRoutes = require("./routes/rentRoutes");



const authRoutes = require("./routes/auth.js");
const bookingRoutes = require("./routes/bookingRoutes");
const dashboardRoutes = require("./routes/dashboard");
const userRoutes = require("./routes/userRoutes");
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/equipment", equipmentRoutes); 
app.use("/api/rent", rentRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use("/api/booking", bookingRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("AgriGo Backend is Running!");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
