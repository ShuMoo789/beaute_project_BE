const mongoose = require("mongoose");
const { Schema } = mongoose;

const routineStepSchema = new Schema(
  {
    stepNumber: {
      type: Number,
      required: true,
    },
    stepName: {
      type: String,
      required: true,
    },
    stepDescription: {
      type: String,
      required: true,
    },
    routine: {
      type: Schema.Types.ObjectId,
      ref: "Routine", // Links back to Routine
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("RoutineStep", routineStepSchema);
