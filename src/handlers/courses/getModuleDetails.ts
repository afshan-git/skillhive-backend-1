import prisma from "../../utils/db";

export const getModuleDetails = async (req, res) => {
  const { moduleId } = req.params;
  try {
    const module = await prisma.module.findUnique({
      where: {
        id: moduleId,
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
    res.status(200).json({ module });
  } catch (error) {
    console.error(error);
  }
};
