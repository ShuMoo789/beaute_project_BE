const QuizAnswer = require("../models/quizAnswer.model");
const QuizQuestion = require("../models/quizQuestion.model");

const quizAnswerServices = {
    // Create a new quiz answer and link it to a quiz question
    create: async (questionId, answerData) => {
        try {
            // Ensure the question exists
            const question = await QuizQuestion.findById(questionId);
            if (!question) {
                throw { status: 404, message: "Quiz question not found" };
            }

            // Create the answer
            const newAnswer = new QuizAnswer({ ...answerData, question: questionId });
            await newAnswer.save();

            // Add the answer to the quiz question's answers array
            await QuizQuestion.findByIdAndUpdate(
                questionId,
                { $push: { answers: newAnswer._id } },
                { new: true, useFindAndModify: false }
            );

            return newAnswer;
        } catch (error) {
            throw { status: error.status || 500, message: error.message };
        }
    },

    // Get all answers
    getAll: async () => {
        try {
            return await QuizAnswer.find().populate("question", "title description");
        } catch (error) {
            throw { status: 500, message: error.message };
        }
    },

    // Get answers by question ID
    getByQuestionId: async (questionId) => {
        try {
            return await QuizAnswer.find({ question: questionId });
        } catch (error) {
            throw { status: 500, message: error.message };
        }
    },

    // Get a single answer by ID
    getById: async (answerId) => {
        try {
            const answer = await QuizAnswer.findById(answerId).populate("question", "title");
            if (!answer) {
                throw { status: 404, message: "Quiz answer not found" };
            }
            return answer;
        } catch (error) {
            throw { status: error.status || 500, message: error.message };
        }
    },

    // Update an answer
    update: async (answerId, updateData) => {
        try {
            const updatedAnswer = await QuizAnswer.findByIdAndUpdate(
                answerId,
                updateData,
                { new: true, useFindAndModify: false }
            );
            if (!updatedAnswer) {
                throw { status: 404, message: "Quiz answer not found" };
            }
            return updatedAnswer;
        } catch (error) {
            throw { status: error.status || 500, message: error.message };
        }
    },

    // Delete an answer and remove it from the related question
    delete: async (answerId) => {
        try {
            const answer = await QuizAnswer.findById(answerId);
            if (!answer) {
                throw { status: 404, message: "Quiz answer not found" };
            }

            // Remove answer from the question's answers array
            await QuizQuestion.findByIdAndUpdate(
                answer.question,
                { $pull: { answers: answer._id } },
                { new: true, useFindAndModify: false }
            );

            // Delete the answer
            await QuizAnswer.findByIdAndDelete(answerId);

            return { message: "Quiz answer deleted successfully" };
        } catch (error) {
            throw { status: error.status || 500, message: error.message };
        }
    },
};

module.exports = quizAnswerServices;
