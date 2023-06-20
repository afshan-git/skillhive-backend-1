import prisma from "../../utils/db";

export const getPosts = async (req, res) => {
  const { courseId } = req.params;
  try {
    const posts = await prisma.post.findMany({
      where: {
        course: courseId,
      },
      select: {
        title: true,
        description: true,
        id: true,
        User: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
          },
        },
      },
    });
    res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
  }
};
