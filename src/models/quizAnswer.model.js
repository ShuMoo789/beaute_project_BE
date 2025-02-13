const mongoose = require("mongoose")

const quizAnswerSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
        },
        point: {
            type: Number,
            required: true,
            default: 0,
        },
    }
)

module.exports = mongoose.model("QuizAnswer", quizAnswerSchema);