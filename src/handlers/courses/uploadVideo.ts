import prisma from "../../utils/db";
export const uploadVideo = async (req, res) => {
  const { videoUrl, title } = req.body;
  const { moduleId, courseId } = req.params;
  try {
    const course = await prisma.video.create({
      data: {
        title: title,
        videoURL: videoUrl,
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
