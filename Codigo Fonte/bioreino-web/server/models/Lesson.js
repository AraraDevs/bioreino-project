const mongoose = require('mongoose');

const Lesson = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true },
  courseTitle: { type: String, required: true },
  transcription: { type: String, required: true },
});

module.exports = mongoose.model('Lesson', Lesson);
