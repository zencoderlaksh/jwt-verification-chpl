require("dotenv").config();
const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const connectDB = require("./db/connect");

// Middleware to parse JSON
app.use(express.json());

connectDB();
// User Routes
app.use("/api/users", userRoutes);

// Admin Routes
app.use("/api/admins", adminRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
