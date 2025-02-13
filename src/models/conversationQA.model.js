const mongoose = require("mongoose");

const conversationQASchema = new mongoose.Schema(
  {
    conversationText: {
      type: String,
    },
    status: {
      type: String,
      enum: ["show", "hide"],
      require: true,
      default: "show",
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("conversationQA", conversationQASchema);
