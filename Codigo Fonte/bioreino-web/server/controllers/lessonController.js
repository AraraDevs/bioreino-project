const Lesson = require('../models/Lesson');

const allLessonsFromTheTitleCourse = async (req, res, next) => {
  const { courseTitle } = req.params;

  try {
    const lessonsSaved = await Lesson.find({ courseTitle });

    if (lessonsSaved.length === 0) {
      next();
    } else {
      res.status(200).json(lessonsSaved);
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const allLessonsFromTheUrlCourse = async (req, res, next) => {
  const { courseUrl } = req.params;

  try {
    const lessonsSaved = await Lesson.find({ courseUrl });

    if (lessonsSaved.length === 0) {
      next();
    } else {
      res.status(200).json(lessonsSaved);
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  allLessonsFromTheTitleCourse,
  allLessonsFromTheUrlCourse,
};
