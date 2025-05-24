const express = require("express");
const {
  submitComplaint,
  getAllComplaints,
  changeComplaintStatus,
  deleteComplaint,
} = require("../controllers/complaintController");

const { protect } = require("../middleware/authMiddleware");


const router = express.Router();

router.get("/", getAllComplaints); // Admin
router.post("/", submitComplaint); // Public
router.patch("/:id/solve", changeComplaintStatus); // Admin
router.delete("/:id", deleteComplaint); // Admin

module.exports = router;
