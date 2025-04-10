const express = require("express");
const {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
} = require("../controllers/newsController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllNews);
router.get("/:id", getNewsById);
router.post("/", protect, createNews);
router.put("/:id", protect, updateNews);
router.delete("/:id", protect, deleteNews);

module.exports = router;
