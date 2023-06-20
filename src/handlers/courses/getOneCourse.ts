import prisma from "../../utils/db";

export const getOneCourse = async (req, res, next) => {
  try {
    const CourseEnrllment = await prisma.courseEnrollment.findFirst({
      where: {
        UserId: req.user.id,
        CourseId: req.params.courseId,
      },
      include: {
        Course: {
          include: {
            Assignment: true,
          },
        },
      },
    });
    res.json({ data: CourseEnrllment.Course });
  } catch (e) {
    e.type = "input";
    next(e);
  }
};
