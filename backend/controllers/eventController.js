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
    tomorrow.setHours(0, 0, 0, 0); //if we didn't did that , it will set the hours in the current time .
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

const getOneEvent = async (req, res, next) => {
  const eventId = req.params.id;

  try {
    const event = await prisma.event.findUnique({ where: { id: eventId } });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.json(event);
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    return res.status(500).json({ message: "Error fetching event" });
  }
};
const createEvent = async (req, res, next) => {
  const eventData = req.body;
  try {
    const event = await prisma.event.create({
      data: {
        title: eventData.title,
        description: eventData.description,
        image: eventData.image,
        type: eventData.type,
        date: new Date(eventData.date),
        time: eventData.time || null,
        location: eventData.location || null,
      },
    });
    return res.status(200).json(event);
  } catch (error) {
    console.error("Error creating event:", error); // 🔍 log actual error
    return res.status(500).json({ message: "Problem With Creating the Event" });
  }
};

const updateEvent = async (req, res, next) => {
  const eventId = req.params.id;
  const eventData = req.body;

  try {
    const updatedData = await prisma.event.update({
      where: { id: eventId },
      data: {
        title: eventData.title,
        description: eventData.description,
        image: eventData.image,
        type: eventData.type,
        date: eventData.date,
      },
    });

    return res
      .status(200)
      .json({ message: "Updated Successfully", updatedData });
  } catch (error) {
    console.error("Update failed:", error);
    return res.status(500).json({ message: "Problem updating the event" });
  }
};

const deleteEvent = async (req, res, next) => {
  const eventId = req.params.id;

  try {
    await prisma.event.delete({
      where: { id: eventId },
    });

    return res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Delete failed:", error);

    // Optional: Check if the error is because the event doesn't exist
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.status(500).json({ message: "Problem deleting the event" });
  }
};

module.exports = {
  getEvents,
  upcomingEvents,
  getOneEvent,
  createEvent,
  updateEvent,
  deleteEvent,
};
