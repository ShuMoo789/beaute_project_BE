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
        },
        products: [{
          type: Schema.Types.ObjectId,
          ref: "Product",
        }],
      }
    ],
    active: {
      type: Boolean,
      default: false
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Routine", routineSchema);
