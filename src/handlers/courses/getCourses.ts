import prisma from "../../utils/db";

export const getCourses = async (req, res, next) => {
  try {
    const CourseEnrllment = await prisma.courseEnrollment.findMany({
      where: {
        UserId: req.user.id,
        // role: "TEACHER"
      },
      include: {
        Course: {
          include: {
            Assignment: true,
          },
        },
      },
    });
    res.json({ data: CourseEnrllment });
  } catch (e) {
    e.type = "input";
    next(e);
  }
};
