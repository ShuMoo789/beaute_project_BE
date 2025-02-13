const mongoose = require("mongoose");

const voucherCustomerSchema = new mongoose.Schema({
  expiryDateCountdown: {
    type: Number,
    required: true,
  },
  usedAt: {
    type: Date,
  },
  isUsed: {
    type: String,
    default: false,
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  }
});

module.exports = mongoose.model("VoucherCustomer", voucherCustomerSchema);
