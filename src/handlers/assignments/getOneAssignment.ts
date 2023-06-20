import prisma from "../../utils/db";
export const getOneAssignment = async (req, res, next) => {
  try {
    const assignment = await prisma.assignment.findUnique({
      where: {
        id: req.params.assignmentId,
      },
    });
    res.json({ data: assignment });
  } catch (e) {
    e.type = "input";
    next(e);
  }
};
