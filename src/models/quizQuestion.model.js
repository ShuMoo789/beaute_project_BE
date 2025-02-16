const mongoose = require("mongoose");

const quizQuestionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        answers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "QuizAnswer",
            }
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("QuizQuestion", quizQuestionSchema);
