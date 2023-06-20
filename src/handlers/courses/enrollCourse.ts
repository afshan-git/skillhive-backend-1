import prisma from "../../utils/db";

export const enrollCourse = async (req, res, next) => {
  //we need two try catches for 2 different async functions
  try {
    const course = await prisma.courseEnrollment.create({
      data: {
        role: "STUDENT",
        Course: { connect: { id: req.body.courseId } },
        User: { connect: { id: req.user.id } },
      },
    });
    res.json({ data: course });
  } catch (e) {
    e.type = "input";
    next(e);
  }
};
