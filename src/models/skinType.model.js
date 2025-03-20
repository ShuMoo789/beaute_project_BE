const mongoose = require("mongoose");
const { Schema } = mongoose;

const skinSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      unique: true,
      enum: [
        "Da khô",
        "Da hỗn hợp thiên khô",
        "Da thường",
        "Da hỗn hợp thiên dầu",
        "Da dầu",
      ],
    },
    description: {
      type: String,
    },
    routines:
      {
        type: Schema.Types.ObjectId,
        ref: "Routine", // Links to Routine model
      },
    pointMin: {
      type: Number,
      required: true, // Minimum points required to fall into this skin type
    },
    pointMax: {
      type: Number,
      required: true, // Maximum points allowed for this skin type
    },
    cause: {
      type: String, // Field for the cause of the skin type
    },
    symptom: {
      type: String, // Field for the symptoms associated with the skin type
    },
    treatment: {
      type: String, // Field for the treatment options for the skin type
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("SkinType", skinSchema);
