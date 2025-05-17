const express = require("express");
const {
  getAllJoinRequests,
  submitJoinRequest,
  confirmJoinRequest,
} = require("../controllers/joinController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", submitJoinRequest);
router.get("/", getAllJoinRequests);
router.patch("/:id/confirm", protect, confirmJoinRequest);

module.exports = router;
