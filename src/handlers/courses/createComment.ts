import prisma from "../../utils/db";

export const createComment = async (req, res) => {
  const { courseId, postId } = req.params;
  const { content, userId } = req.body;
  try {
    const post = await prisma.postComments.create({
      data: {
        content: content,
        User: {
          connect: {
            id: userId,
          },
        },
        Post: {
          connect: {
            id: postId,
          },
        },
      },
      select: {
        content: true,
        User: {
          select: {
            firstname: true,
            lastname: true,
            id: true,
          },
        },
        Post: true,
      },
    });
    res.status(201).json({ post });
  } catch (error) {
    console.error(error);
  }
};
