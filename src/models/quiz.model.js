const mongoose = require("mongoose")

const quizSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        point: {
            type: Number,
            required: true,
            default: 0,
        },
        description: {
            type: String,
            required: true,
        },
    }
)

module.exports = mongoose.model("Quiz", quizSchema);