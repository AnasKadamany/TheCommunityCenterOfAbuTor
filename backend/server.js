const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routers/authRoutes");
const eventRoutes = require("./routers/eventRoutes");
const newsRoutes = require("./routers/newsRoutes");
const joinRoutes = require("./routers/joinRoutes");
const complaintRoutes = require("./routers/complaintRoutes");
const uploadRoutes = require("./routers/uploadRoutes");
const cors = require("cors");
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json()); // to put the json in the req.body
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/joins", joinRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/upload", uploadRoutes);

app.listen(process.env.PORT || 8080, () => {
  console.log("Server running on port 8080");
});
