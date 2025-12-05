require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
  })
);

app.use(express.json());

// Connect DB
connectDB();

app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend is running" });
});

// Routes
app.use("/api/auth", authRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5004;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
  console.log("Mongo URL present?", !!process.env.MONGO_URL);
  console.log("GMAIL_USER present?", !!process.env.GMAIL_USER);
  console.log("GOOGLE_CLIENT_ID present?", !!process.env.GOOGLE_CLIENT_ID);
  console.log("GOOGLE_CLIENT_SECRET present?", !!process.env.GOOGLE_CLIENT_SECRET);
  console.log("GOOGLE_REFRESH_TOKEN present?", !!process.env.GOOGLE_REFRESH_TOKEN);
});
