const prisma = require("../utils/prismaClient");

const getEvents = async (req, res, next) => {
  try {
    const events = await prisma.event.findMany();
    return res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return res.status(500).json({ error: "Failed to fetch events" });
  }
};

const upcomingEvents = async (req, res, next) => {
  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); // set to midnight
    const events = await prisma.event.findMany({
      where: { date: { gt: tomorrow } },
      orderBy: { date: "asc" },
      take: 3,
    });
    return res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return res.status(500).json({ error: "Failed to fetch events" });
  }
};

module.exports = { getEvents, upcomingEvents };
