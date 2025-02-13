const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
  inventory: {
    type: Number,
    required: true,
    default: 0,
  },
  StaffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
    required: true,
  },
  stepRotineId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StepRoutine",
    required: true,
  },
  VoucherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Voucher",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
