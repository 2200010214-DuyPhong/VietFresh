const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, default: 'Admin' },
  date: { type: String, required: true },
  readTime: { type: String, default: '5 phút' },
});

module.exports = mongoose.model('News', newsSchema);
