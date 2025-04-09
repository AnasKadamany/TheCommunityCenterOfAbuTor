const express = require("express");
const { getEvents, upcomingEvents } = require("../controllers/eventController");
const router = express.Router();

router.get("/", getEvents);
router.get("/upcoming", upcomingEvents);

module.exports = router;
