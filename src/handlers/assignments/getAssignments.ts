import prisma from "../../utils/db";

export const getAssignments = async (req, res, next) => {
  try {
    const assignments = await prisma.assignment.findMany({
      where: {
        courseId: req.params.courseId,
      },
    });
    res.json({ data: assignments });
  } catch (e) {
    e.type = "input";
    next(e);
  }
};
