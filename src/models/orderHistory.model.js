const mongoose = require("mongoose");

const orderHistorySchema = new mongoose.Schema(
  {
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Completed"],
      default: "Pending",
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("OrderHistory", orderHistorySchema);
