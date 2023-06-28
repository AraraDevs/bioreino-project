const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

router.get('/:courseTitle', lessonController.allLessonsFromTheTitleCourse);
router.get('/:courseUrl', lessonController.allLessonsFromTheUrlCourse);

module.exports = router;
