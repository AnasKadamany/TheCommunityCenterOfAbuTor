const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routers/authRoutes");
const eventRoutes = require("./routers/eventRoutes");
dotenv.config();
const app = express();

app.use(express.json()); // to put the json in the req.body
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

app.listen(process.env.PORT || 8080, () => {
  console.log("Server running on port 8080");
});
