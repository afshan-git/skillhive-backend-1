import prisma from "../../utils/db";

export const createPost = async (req, res) => {
  const { courseId } = req.params;
  const { userId, title, description } = req.body;
  try {
    const post = await prisma.post.create({
      data: {
        title: title,
        description: description,
        User: {
          connect: {
            id: userId,
          },
        },
        course: {
          connect: {
            id: courseId,
          },
        },
      },
      include: {
        User: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
          },
        },
      },
    });
    res.status(201).json({ post });
  } catch (error) {
    console.error(error);
  }
};
