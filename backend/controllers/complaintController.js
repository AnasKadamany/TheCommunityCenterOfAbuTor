const prisma = require("../utils/prismaClient");

const submitComplaint = async (req, res) => {
  const { name, email, phone, description } = req.body;

  let images = req.body.images || [];

  // Ensure images is always an array
  if (!Array.isArray(images)) {
    images = [images]; // in case it's a single string (from a form)
  }

  try {
    const complaint = await prisma.complaint.create({
      data: { name, email, phone, description, images },
    });

    res
      .status(200)
      .json({ message: "Complaint submitted successfully", complaint });
  } catch (error) {
    console.error("Error submitting complaint:", error);
    res.status(500).json({ message: "Error submitting complaint" });
  }
};

const getAllComplaints = async (req, res) => {
  try {
    const complaints = await prisma.complaint.findMany({
      orderBy: { createdAt: "desc" },
    });

    res
      .status(200)
      .json({ message: "Complaints retrieved successfully", complaints });
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ message: "Error fetching complaints" });
  }
};

const markComplaintSolved = async (req, res) => {
  const complaintId = req.params.id;

  try {
    const updatedComplaint = await prisma.complaint.update({
      where: { id: complaintId },
      data: { isSolved: true },
    });

    res.status(200).json({
      message: "Complaint marked as solved",
      complaint: updatedComplaint,
    });
  } catch (error) {
    console.error("Error updating complaint:", error);
    res.status(500).json({ message: "Error updating complaint" });
  }
};

module.exports = {
  submitComplaint,
  getAllComplaints,
  markComplaintSolved,
};
