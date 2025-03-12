const QuizAnswer = require("../models/quizAnswer.model");
const QuizQuestion = require("../models/quizQuestion.model");

const quizAnswerServices = {
    // Create new quiz answers and link them to a quiz question
    create: async (questionId, answerDataArray) => {
        try {
            // Ensure the question exists
            const question = await QuizQuestion.findById(questionId);
            if (!question) {
                throw { status: 404, message: "Quiz question not found" };
            }

            // Create an array to hold the new answers
            const newAnswers = [];

            // Loop through the answerDataArray and create answers
            for (const answerData of answerDataArray) {
                const newAnswer = new QuizAnswer({ ...answerData, question: questionId });
                await newAnswer.save();
                newAnswers.push(newAnswer._id); // Store the new answer ID
            }

            // Add all new answers to the quiz question's answers array
            await QuizQuestion.findByIdAndUpdate(
                questionId,
                { $push: { answers: { $each: newAnswers } } }, // Use $each to add multiple IDs
                { new: true, useFindAndModify: false }
            );
            await question.populate({
                path: 'answers',
                select: 'text point' // Filter to only include text and point fields
            });
            return question; // Return the array of new answer IDs
        } catch (error) {
            console.log(error)
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
