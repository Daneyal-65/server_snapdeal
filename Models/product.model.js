const mongoose = require("mongoose");

// Product Schema
const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  offPrice: { type: Number },
  image: { type: String },
  rating: { type: Object, default: { rate: 0, count: 0 } },
  size: { type: [String] },
  category: { type: String, required: true },
  subCategory: { type: String },
});

const Product = mongoose.model("products", productSchema);
module.exports = Product;
