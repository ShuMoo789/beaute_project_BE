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
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
  },
  stepRotineId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StepRoutine",
  },
  voucherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Voucher",
  },
});

module.exports = mongoose.model("Product", productSchema);
