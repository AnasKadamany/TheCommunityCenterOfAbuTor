const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

const authRoutes = require("./routers/authRoutes");
const eventRoutes = require("./routers/eventRoutes");
const newsRoutes = require("./routers/newsRoutes");
const joinRoutes = require("./routers/joinRoutes");
const complaintRoutes = require("./routers/complaintRoutes");
const uploadRoutes = require("./routers/uploadRoutes");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../frontend")));

// Serve HTML pages for navigation (direct URLs)
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../frontend/UserInterface/index.html"))
);
app.get("/events.html", (req, res) =>
  res.sendFile(path.join(__dirname, "../frontend/UserInterface/events.html"))
);
app.get("/adminPanel/login.html", (req, res) =>
  res.sendFile(path.join(__dirname, "../frontend/adminPanel/login.html"))
);
app.get("/adminPanel/dashboard.html", (req, res) =>
  res.sendFile(path.join(__dirname, "../frontend/adminPanel/dashboard.html"))
);

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/joins", joinRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/upload", uploadRoutes);

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`);
});
