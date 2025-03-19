const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  usage: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  productDiscount: {
    type: Number,
    default: 0, // Mặc định là 0 (không giảm giá)
    min: 0,
    max: 100 // Giới hạn từ 0% đến 100%
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Category"
  },
  skinTypeId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "SkinType",
  }],
  usageTime: {
    type: String,
    required: true,
    enum: ["Ban ngày", "Ban đêm", "Cả ngày và đêm"],
  },  
  origin: {
    type: String,
    required: true,
  },
  volume: {
    type: String,
    required: true,
  },
  inventory: {
    type: Number,
    required: true,
    default: 0,
  },
  priority: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  expiredDate: {
    type: Date
  },
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
