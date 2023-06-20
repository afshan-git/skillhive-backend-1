import prisma from "../../utils/db";

export const createModule = async (req, res) => {
  const { courseId } = req.params;
  const { title, moduleNumber } = req.body;
  try {
    const module = await prisma.module.create({
      data: {
        title: title,
        moduleNumber: moduleNumber,
        course: {
          connect: {
            id: courseId,
          },
        },
      },
      select: {
        course: {
          select: {
            name: true,
            id: true,
            Module: true,
          },
        },
        videos: true,
        lectureNotes: true,
      },
    });
    res.status(201).json({ module });
  } catch (error) {
    console.error(error);
  }
};
