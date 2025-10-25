const express = require('express');
const News = require('../models/News'); // nhớ đảm bảo file models/News.js cũng dùng require

const router = express.Router();

// Lấy tất cả tin tức
router.get('/', async (req, res) => {
  try {
    const news = await News.find().sort({ _id: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy tin tức', error });
  }
});

// Lấy tin tức theo ID
router.get('/:id', async (req, res) => {
  try {
    const item = await News.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Không tìm thấy tin tức' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy tin tức', error });
  }
});

module.exports = router;
