const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    amount: {
      type: Number,
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
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        image: { type: String, required: true },
        name: { type: String, requiredd: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        productDiscount: {
          type: Number,
          default: 0,
          min: 0,
          max: 100,
        },
        totalPriceAfterDiscount: { type: Number, default: 0 },
      },
    ],
    appTransId: { type: String },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Order", orderSchema);
