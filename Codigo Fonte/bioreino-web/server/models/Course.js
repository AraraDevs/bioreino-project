const mongoose = require('mongoose');

const Course = new mongoose.Schema({
  title: { type: String, required: true },
  professor: { type: String, required: true },
  imageUrl: { type: String, required: true },
  plan: { type: String, required: true },
  category: { type: String, required: true },
});

module.exports = mongoose.model('Course', Course);
