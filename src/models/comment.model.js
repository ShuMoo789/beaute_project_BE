const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    commtText: {
      type: String,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    status: {
      type: String,
      enum: ["show", "hide"],
      require: true,
      default: "show",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    orderHistoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderHistory",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Commemt", commentSchema);
