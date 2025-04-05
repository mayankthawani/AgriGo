const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const equipmentRoutes = require("./routes/equipmentRoutes");
const rentRoutes = require("./routes/rentRoutes");
const authRoutes = require("./routes/auth");
const bookingRoutes = require("./routes/bookingRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const userRoutes = require("./routes/userRoutes");
const aiPricingRoutes = require("./routes/aiPricingRoutes");
const Message = require("./models/Message");

// Import socket handler
const socketHandler = require('./socket/socketHandler');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000", // React frontend
      "http://localhost:5173", // Vite frontend
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Connect to Database
connectDB();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Create uploads directory if it doesn't exist
const fs = require('fs');
const uploadsDir = './uploads/documents';
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/rent", rentRoutes);
app.use("/api/ai-pricing", aiPricingRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/user", userRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("✅ AgriGo Backend is Running!");
});

// Initialize socket handler
socketHandler(io);

// WebSocket Connection
io.on("connection", (socket) => {
  console.log(`⚡ A user connected: ${socket.id}`);

  socket.on("sendMessage", async ({ sender, receiver, message }) => {
    try {
      if (!sender || !receiver || !message) {
        console.warn("⚠️ Missing fields in sendMessage event");
        return;
      }

      const newMessage = new Message({ sender, receiver, message });
      await newMessage.save();
      io.emit("receiveMessage", newMessage);
    } catch (error) {
      console.error("❌ Error saving message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
