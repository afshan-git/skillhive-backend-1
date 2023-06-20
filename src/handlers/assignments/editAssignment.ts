import prisma from "../../utils/db";
export const editAssignment = async (req, res) => {
  const { assignmentId } = req.params;
  const { title, description, startTime, endTime, marks } = req.body;
  try {
    const assignment = await prisma.assignment.update({
      where: {
        id: assignmentId,
      },
      data: {
        name: title,
        description: description,
        marks: marks ? marks : null,
        startTime: startTime,
        dueTime: endTime ? endTime : null,
      },
    });
    res.status(200).json({ assignment });
  } catch (error) {
    console.error(error);
  }
};
