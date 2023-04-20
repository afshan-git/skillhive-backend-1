import { Router } from "express";
import { deleteUser, getUser } from "../handlers/users";
import {
  createCourse,
  deleteCourse,
  enrollCourse,
  getCourses,
  getOneCourse,
  unenrollCourse,
} from "../handlers/courses";
import {
  createAssignment,
  deleteAssignment,
  getOneAssignment,
  getAssignments,
} from "../handlers/assignments";
import { body, param } from "express-validator";
import { handleInputErrors } from "../modules/middlewares";

const router = Router();
router.get("/users/courses", getCourses);
router.get("/users/courses/:courseId", getOneCourse);
// teacher courses
router.post(
  "/teachers/courses",
  body("courseName").isString(),
  body("courseDetails").isString(),
  handleInputErrors,
  createCourse
);
router.put("/teachers/courses/:courseId", () => {});
router.delete("/teachers/courses/:courseId", deleteCourse);

//stuent courses

router.post(
  "/students/courses",
  body("courseId").exists(),
  handleInputErrors,
  enrollCourse
);
router.delete("/students/courses/:courseId", handleInputErrors, unenrollCourse);

// teacher assignment

router.get("/teachers/courses/:courseId/assignments", getAssignments);
router.get(
  "/teachers/courses/:courseId/assignments/:assignmentId",
  param("courseId").exists(),
  param("assignmentId").exists(),
  handleInputErrors,
  getOneAssignment
);
router.post(
  "/teachers/courses/:courseId/assignments",
  body("assignmentName").isString(),
  body("description").isString(),
  body("startTime").isString(),
  body("dueTime").optional().isString(),
  body("Attachment").optional().isString(),
  body("marks").optional().isString(),
  handleInputErrors,
  createAssignment
);
router.put("/teachers/courses/:courseId/assignments/:assignmentId", () => {});
router.delete(
  "/teachers/courses/:courseId/assignments/:assignmentId",
  deleteAssignment
);

// student assignment

router.get(
  "/students/courses/:courseId/assignments",
  param("courseId").exists(),
  handleInputErrors,
  getAssignments
);
router.get(
  "/students/courses/:courseId/assignments/:assignmentId",
  param("courseId").exists(),
  param("assignmentId").exists(),
  handleInputErrors,
  getOneAssignment
);

//teacher assignment submission

router.get(
  "/teachers/courses/:courseId/assignments/:assignmentId/assignmentSubmission/",
  () => {}
);
router.get(
  "/teachers/courses/:courseId/assignments/:assignmentId/assignmentSubmissions/:assignmentSubmissionId",
  () => {}
);
router.post(
  "/teachers/courses/:courseId/assignment/:assignmentId/assignmentSubmissions/",
  () => {}
);
router.put(
  "/teachers/courses/:courseId/assignments/:assignmentId/assignmentSubmissions/:assignmentSubmissionId",
  () => {}
);
router.delete(
  "/teachers/courses/:courseId/assignments/:assignmentId/assignmentSubmissions/:assignmentSubmissionId",
  () => {}
);

//student assignment submission

router.get(
  "/students/courses/:courseId/assignments/:assignmentId/assignmentSubmissions/:assignmentSubmissionId",
  () => {}
);
router.put(
  "/students/courses/:courseId/assignments/:assignmentId/assignmentSubmissions/:assignmentSubmissionId",
  () => {}
);

export default router;
