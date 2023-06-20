import prisma from "../../utils/db";
export const uploadNotes = async (req, res) => {
  const { notesUrl, title, description } = req.body;
  const { moduleId, courseId } = req.params;
  try {
    const course = await prisma.lectureNotes.create({
      data: {
        title: title,
        description: description,
        lectureURL: notesUrl,
        module: {
          connect: {
            id: moduleId,
          },
        },
        course: {
          connect: {
            id: courseId,
          },
        },
      },
      include: {
        course: {
          select: {
            name: true,
            courseDetails: true,
            Module: {
              select: {
                videos: true,
                lectureNotes: true,
              },
            },
          },
        },
      },
    });
    res.status(201).json({ course });
  } catch (e) {
    console.error(e);
  }
};
