import prisma from "../../utils/db";
export const createCourse = async (req, res, next) => {
  //we need two try catches for 2 different async functions
  try {
    const course = await prisma.course.create({
      data: {
        name: req.body.courseName, //"DSA Fundamentals",
        courseDetails: req.body.courseDetails, //"A breif study on data structures and algorithms fundamentals",
        CourseEnrollment: {
          create: {
            role: "TEACHER",
            User: {
              connect: { id: req.user.id },
            },
          },
        },
      },
    });
    res.json({ data: course });
  } catch (e) {
    e.type = "input";
    next(e);
  }
};
