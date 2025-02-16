const mongoose = require("mongoose")

const quizAnswerSchema = new mongoose.Schema(
    {
        question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "QuizQuestion",
            required: true,
        },
        text: {
            type: String,
            required: true,
            trim: true,
        },
        point: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("QuizAnswer", quizAnswerSchema);