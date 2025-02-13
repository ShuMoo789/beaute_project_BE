const mongoose = require("mongoose");

const stepRoutineSchema = new mongoose.Schema(
  {
    stepName: {
      type: String,
      required: true,
    },
    stepDescription: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("StepRoutine", stepRoutineSchema);
