const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  ProductCode: { type: String, required: true, unique: true },
  ProductName: { type: String, required: true },
  Category: String,
  Price: Number,
  Poster: String,
  Unit: String,
  Origin: String,
  HarvestDate: String,
  ExpiryDate: String,
  Describe: String,
});

const Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;
