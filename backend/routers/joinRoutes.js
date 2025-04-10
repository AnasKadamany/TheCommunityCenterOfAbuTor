const express = require("express");
const {
  getAllJoinRequests,
  submitJoinRequest,
  confirmJoinRequest,
} = require("../controllers/joinController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", submitJoinRequest); // Public
router.get("/", protect, getAllJoinRequests); // Admin only
router.patch("/:id/confirm", protect, confirmJoinRequest); // Admin only

module.exports = router;
