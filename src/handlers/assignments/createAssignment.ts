import prisma from "../../utils/db";
import createCalanderEvent from "../../utils/calendarApi";

//Teacher
let event;

export const createAssignment = async (req, res, next) => {
  //we need two try catches for 2 different async functions
  const { assignmentName, description, startTime, endTime, marks } = req.body;
  try {
    console.log("HEllo");
    const assignment = await prisma.assignment.create({
      data: {
        name: assignmentName,
        description: description,
        marks: marks ? marks : null,
        startTime: new Date(startTime),
        dueTime: endTime ? new Date(endTime) : null,
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
    let attendies = [{ email: "balu_eie@eie.sastra.edu" }];
    for (let i = 0; i < CourseEnrollment.length; i++) {
      attendies.push(CourseEnrollment[i].User);
    }

    let startTime1 = new Date(startTime);

    event = {
      summary: assignment.name,
      location: `Google Meet`,
      description: assignment.description,
      colorId: 1,
      start: {
        dateTime: assignment.startTime,
        timeZone: "Indian/Maldives",
      },
      creator: { email: req.user.email },
      attendees: attendies,
      end: {
        dateTime: assignment.dueTime,
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
