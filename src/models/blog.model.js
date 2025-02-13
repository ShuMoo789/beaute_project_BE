const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    view: {
      type: Number,
      default: 0,
    },
    like: {
        type: Number,
        default: 0,
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

module.exports = mongoose.model("Blog", blogSchema);
