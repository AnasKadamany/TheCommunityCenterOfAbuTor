const express = require("express");
const {
  getAllJoinRequests,
  submitJoinRequest,
  confirmJoinRequest,
  deleteJoinRequest,
} = require("../controllers/joinController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", submitJoinRequest);
router.get("/", getAllJoinRequests);
router.patch("/:id/confirm", confirmJoinRequest);
router.delete("/:id", deleteJoinRequest);

module.exports = router;
