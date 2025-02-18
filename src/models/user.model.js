const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: { 
      type: String
    },
    name: { 
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
    },
    role: {
      type: [String],
      enum: ["customer", "staff", "manager"],
      default: ["customer"],
      required: true,
    },
    skinType: {
      type: Schema.Types.ObjectId,
      ref: "Skin", // Reference to Skin table
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
