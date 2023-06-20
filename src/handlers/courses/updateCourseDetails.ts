import prisma from "../../utils/db";
export const updateCourseDetails = async (req, res) => {
  const { courseId } = req.params;
  const { name, description } = req.body;
  try {
    const course = await prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        name: name,
        courseDetails: description,
      },
    });
    res.status(200).json({ course });
  } catch (error) {
    console.error(error);
  }
};
