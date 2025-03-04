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

// Middleware to add answer ID to question's answers array
quizQuestionSchema.statics.addAnswerToQuestion = async function(questionId, answerId) {
    try {
        await this.findByIdAndUpdate(
            questionId,
            { $addToSet: { answers: answerId } } // $addToSet prevents duplicate entries
        );
    } catch (error) {
        throw new Error(`Failed to add answer to question: ${error.message}`);
    }
};

// Middleware to remove answer ID from question's answers array
quizQuestionSchema.statics.removeAnswerFromQuestion = async function(questionId, answerId) {
    try {
        await this.findByIdAndUpdate(
            questionId,
            { $pull: { answers: answerId } }
        );
    } catch (error) {
        console.log(error)
        throw new Error(`Failed to remove answer from question: ${error.message}`);
    }
};

module.exports = mongoose.model("QuizQuestion", quizQuestionSchema);
