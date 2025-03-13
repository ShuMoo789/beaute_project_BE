const mongoose = require("mongoose");

const orderHistorySchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
    },
    status: {
      type: String,
    },
    orderDate: {
      type: Date,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, requiredd: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("OrderHistory", orderHistorySchema);
