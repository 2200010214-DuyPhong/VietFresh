const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const newsRoutes = require('./routes/newsRoutes'); // ✅ đã đúng
const cors = require('cors');
const path = require('path');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '../client/public/images')));

app.use('/api/products', productRoutes);
app.use('/api/news', newsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
