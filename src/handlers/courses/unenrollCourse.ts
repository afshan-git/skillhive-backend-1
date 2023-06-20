import prisma from "../../utils/db";

export const unenrollCourse = async (req, res, next) => {
  try {
    const CourseEnrllment = await prisma.courseEnrollment.deleteMany({
      where: {
        role: "STUDENT",
        UserId: req.user.id,
        CourseId: req.params.courseId,
      },
    });
    res.json({ data: CourseEnrllment });
  } catch (e) {
    e.type = "input";
    next(e);
  }
};
