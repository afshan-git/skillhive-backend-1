import { isDate } from "util/types";
import prisma from "../utils/db";
import { hrtime } from "process";
import { start } from "repl";
import createCalanderEvent from "../utils/calendarApi";

//Teacher
let event;
export const createAssignment = async (req, res, next) => {
  //we need two try catches for 2 different async functions
  try {
    const assignment = await prisma.assignment.create({
      data: {
        name: req.body.assignmentName,
        description: req.body.description,
        startTime: new Date(req.body.startTime), //example: "2023-03-08 12:00:00"
        marks: req.body.marks,
        Course: {
          connect: { id: req.params.courseId },
        },
      },
      include: {
        Course: {
          include: {
            CourseEnrollment: {
              include: {
                User: {
                  select: {
                    email: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    let CourseEnrollment = assignment.Course.CourseEnrollment;
    let attendies = [];
    for (let i = 0; i < CourseEnrollment.length; i++) {
      attendies.push(CourseEnrollment[i].User);
    }
    let startTime = new Date(assignment.startTime);

    event = {
      summary: assignment.name,
      location: `Google Meet`,
      description: assignment.description,
      colorId: 1,
      start: {
        dateTime: startTime,
        timeZone: "Indian/Maldives",
      },
      creator: { email: req.user.email },
      attendees: attendies,
      end: {
        dateTime: new Date(startTime.getTime() + 60 * 60 * 1000),
        timeZone: "Indian/Maldives",
      },
    };
    if (assignment) {
      console.log(startTime);
      createCalanderEvent(event);
    }
    res.json({ data: assignment });
  } catch (e) {
    e.type = "input";
    next(e);
  }
};

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

export const deleteAssignment = async (req, res, next) => {
  try {
    const assignment = await prisma.assignment.delete({
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

export default event;
