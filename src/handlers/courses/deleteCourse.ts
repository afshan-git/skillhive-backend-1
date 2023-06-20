import prisma from "../../utils/db";

export const deleteCourse = async (req, res, next) => {
  try {
    const CourseEnrllment = await prisma.courseEnrollment.deleteMany({
      where: {
        CourseId: req.params.courseId,
      },
    });
    const Course = await prisma.course.delete({
      where: {
        id: req.params.courseId,
      },
    });
    res.json({ data: CourseEnrllment, Course });
  } catch (e) {
    e.type = "input";
    next(e);
  }
};

//Student:
