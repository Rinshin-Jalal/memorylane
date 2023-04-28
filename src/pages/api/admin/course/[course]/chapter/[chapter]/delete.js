import { connect } from "@/utils/db";
import courseModel from "@/models/courseModel";
import isAuthenticated from "@/middlewares/isAuthenticated";

async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Authorization"
  );
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" }).end();
  }

  try {
    await connect();

    const { course: courseSlug, chapter: chapterSlug } = req.query;

    const course = await courseModel.findById(courseSlug);

    if (!courseData) {
      return res.status(404).json({ message: "Course not found" });
    }

    const deletedChapter = course.chapters.find(
      (chapter) => chapter.slug === chapterSlug
    );

    if (deletedChapter) {
      course.chapters.splice(course.chapters.indexOf(deletedChapter), 1);
    }

    await course.save();

    return res.status(200).json(deletedChapter);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export default isAuthenticated(handler, "moderator");
