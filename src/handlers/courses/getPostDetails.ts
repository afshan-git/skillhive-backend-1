import prisma from "../../utils/db";

export const getPostDetails = async (req, res) => {
  const { courseId, postId } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        title: true,
        description: true,
        PostComments: true,
        PostLikes: true,
        User: {
          select: {
            firstname: true,
            lastname: true,
            id: true,
          },
        },
      },
    });
    res.status(200).json({ data: { post: post } });
  } catch (error) {
    console.error(error);
  }
};
