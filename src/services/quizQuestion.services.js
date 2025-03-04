const QuizQuestion = require("../models/quizQuestion.model");

module.exports = {
  // Create a new quiz question
  create: async (formData) => {
    try {
      const quizQuestion = new QuizQuestion(formData);
      await quizQuestion.save();
      return quizQuestion;
    } catch (error) {
      throw { status: 500, message: "Failed to create quiz question" };
    }
  },

  // Get all quiz questions with specific answer fields
  getAll: async () => {
    try {
      return await QuizQuestion
      .find()
      .populate({
        path: 'answers',
        select: '_id question text point'
      });
    } catch (error) {
      throw { status: 500, message: "Failed to retrieve quiz questions" };
    }
  },

  // Get a single quiz question by ID
  getById: async (id) => {
    try {
      return await QuizQuestion.findById(id);
    } catch (error) {
      throw { status: 500, message: "Failed to retrieve quiz question" };
    }
  },

  // Update a quiz question
  update: async (id, formData) => {
    try {
      return await QuizQuestion.findByIdAndUpdate(id, formData, { new: true });
    } catch (error) {
      throw { status: 500, message: "Failed to update quiz question" };
    }
  },

  // Delete a quiz question
  delete: async (id) => {
    try {
      return await QuizQuestion.findByIdAndDelete(id);
    } catch (error) {
      throw { status: 500, message: "Failed to delete quiz question" };
    }
  },

  // Add a quiz answer to a question
  addAnswer: async (questionId, answerId) => {
    try {
      const question = await QuizQuestion.findById(questionId);
      if (!question) {
        throw { status: 404, message: "Quiz question not found" };
      }
      
      await QuizQuestion.addAnswerToQuestion(questionId, answerId);
      return await QuizQuestion.findById(questionId).populate('answers');
    } catch (error) {
      if (error.status === 404) throw error;
      throw { status: 500, message: "Failed to add answer to question" };
    }
  },

  // Remove a quiz answer from a question
  removeAnswer: async (questionId, answerId) => {
    try {
      const question = await QuizQuestion.findById(questionId);
      if (!question) {
        throw { status: 404, message: "Quiz question not found" };
      }
      
      await QuizQuestion.removeAnswerFromQuestion(questionId, answerId);
      return await QuizQuestion.findById(questionId).populate('answers');
    } catch (error) {
      if (error.status === 404) throw error;
      throw { status: 500, message: "Failed to remove answer from question" };
    }
  },

  // Get all answers for a specific question
  getAnswers: async (questionId) => {
    try {
      const question = await QuizQuestion.findById(questionId).populate('answers');
      if (!question) {
        throw { status: 404, message: "Quiz question not found" };
      }
      return question.answers;
    } catch (error) {
      if (error.status === 404) throw error;
      throw { status: 500, message: "Failed to retrieve answers for question" };
    }
  }
};
