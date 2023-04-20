import prisma from "../utils/db";

//Teacher
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
