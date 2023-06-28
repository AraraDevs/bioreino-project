const mongoose = require('mongoose');

const Category = new mongoose.Schema({
  name: { type: String, required: true },
  plan: { type: String, required: true },
});

module.exports = mongoose.model('categories', Category);
