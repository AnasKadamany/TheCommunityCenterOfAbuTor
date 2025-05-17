const express = require("express");
const {
  submitComplaint,
  getAllComplaints,
  markComplaintSolved,
} = require("../controllers/complaintController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllComplaints); // Admin
router.post("/", submitComplaint); // Public
router.patch("/:id/solve", protect, markComplaintSolved); // Admin

module.exports = router;
