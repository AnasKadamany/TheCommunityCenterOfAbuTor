const prisma = require("../utils/prismaClient");

const getAllNews = async (req, res) => {
  const lang = req.query.lang?.toLowerCase() || "en";
  try {
    const news = await prisma.news.findMany({ orderBy: { date: "desc" } });

    const translatedNews = news.map((item) => {
      return {
        ...item,
        title: item.title[lang],
        description: item.description[lang],
      };
    });
    res.status(200).json(translatedNews);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ message: "Failed to fetch news" });
  }
};

const getNewsById = async (req, res) => {
  const newsId = req.params.id;
  const lang = req.query.lang?.toLowerCase() || "en";

  try {
    const news = await prisma.news.findUnique({ where: { id: newsId } });

    if (!news) {
      return res.status(404).json({ message: "News item not found" });
    }

    const translatedNews = {
      ...news,
      title: news.title?.[lang] || "",
      description: news.description?.[lang] || "",
    };

    res.status(200).json(translatedNews);
  } catch (error) {
    console.error("Error fetching news by ID:", error);
    res.status(500).json({ message: "Error fetching news" });
  }
};

const createNews = async (req, res) => {
  const { title, description, image, date } = req.body;
  const isoDate = new Date(date).toISOString();
  try {
    const newNews = await prisma.news.create({
      data: { title, description, image, date: isoDate },
    });

    res.status(200).json(newNews);
  } catch (error) {
    console.error("Error creating news:", error);
    res.status(500).json({ message: "Failed to create news" });
  }
};

const updateNews = async (req, res) => {
  const newsId = req.params.id;
  const { title, description, image, date } = req.body;
  const isoDate = new Date(date).toISOString();
  try {
    const updatedNews = await prisma.news.update({
      where: { id: newsId },
      data: { title, description, image, date: isoDate },
    });

    res
      .status(200)
      .json({ message: "News updated successfully", news: updatedNews });
  } catch (error) {
    console.error("Error updating news:", error);
    res.status(500).json({ message: "Failed to update news" });
  }
};

const deleteNews = async (req, res) => {
  const newsId = req.params.id;

  try {
    await prisma.news.delete({ where: { id: newsId } });
    res.status(200).json({ message: "News deleted successfully" });
  } catch (error) {
    console.error("Error deleting news:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ message: "News item not found" });
    }

    res.status(500).json({ message: "Failed to delete news" });
  }
};

module.exports = {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
};
