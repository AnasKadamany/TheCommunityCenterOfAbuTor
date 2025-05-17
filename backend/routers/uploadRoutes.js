const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");

router.post("/", upload.single("image"), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ message: "No image uploaded" });
  }

  res.status(200).json({ imageUrl: req.file.path });
});

router.post("/public", upload.single("image"), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ message: "No image uploaded" });
  }

  res.status(200).json({ imageUrl: req.file.path });
});

module.exports = router;
