const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.get('/', courseController.getCourse);
router.get('/:title', courseController.getCourseByTitle);
router.get('/all/:limit', courseController.allCourses);

module.exports = router;