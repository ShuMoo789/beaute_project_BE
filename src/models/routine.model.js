const mongoose = require("mongoose");
const { Schema } = mongoose;

const routineSchema = new Schema(
  {
    routineName: {
      type: String,
      required: true,
    },
    routineDescription: {
      type: String,
      required: true,
    },
    skinType: {
      type: Schema.Types.ObjectId,
      ref: "SkinType",
      required: true,
    },
    steps: [
      {
        type: Schema.Types.ObjectId,
        ref: "RoutineStep", // Links to RoutineStep model
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Routine", routineSchema);
