const express = require("express");
const {
  getEvents,
  upcomingEvents,
  getOneEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", getEvents);
router.post("/", protect, createEvent);
router.get("/upcoming", upcomingEvents);
router.get("/:id", getOneEvent);
router.put("/:id", protect, updateEvent);
router.delete("/:id", protect, deleteEvent);

module.exports = router;
