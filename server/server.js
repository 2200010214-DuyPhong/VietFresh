const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();

// CORS middleware nên đặt trước các route
app.use(cors({
  origin: 'http://localhost:3001', // hoặc 'http://localhost:3000' nếu client chạy trên 3000
  credentials: true
}));

// Middleware để debug
app.use('/api/products', (req, res, next) => {
  next();
}, productRoutes);

// Hoặc chỉ cần 1 dòng này cũng được
// app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
