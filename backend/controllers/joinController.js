const prisma = require("../utils/prismaClient");

const getAllJoinRequests = async (req, res) => {
  try {
    const joinRequests = await prisma.eventJoin.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json(joinRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving join requests" });
  }
};

const submitJoinRequest = async (req, res) => {
  const { name, eventId, email, phone, number, reason } = req.body;

  try {
    const submitData = await prisma.eventJoin.create({
      data: { name, eventId, email, phone, number, reason },
    });
    res.status(200).json({
      message: "Join request submitted successfully",
      data: submitData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error submitting join request" });
  }
};

const confirmJoinRequest = async (req, res) => {
  const joinId = req.params.id;

  try {
    const updatedJoin = await prisma.eventJoin.update({
      where: { id: joinId },
      data: { isConfirmed: true },
    });

    res
      .status(200)
      .json({ message: "Join request confirmed", data: updatedJoin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error confirming join request" });
  }
};

const deleteJoinRequest = async (req, res) => {
  const joinId = req.params.id;

  try {
    await prisma.eventJoin.delete({
      where: { id: joinId },
    });

    res.status(200).json({ message: "Join request deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting join request" });
  }
};

module.exports = {
  getAllJoinRequests,
  submitJoinRequest,
  confirmJoinRequest,
  deleteJoinRequest,
};
