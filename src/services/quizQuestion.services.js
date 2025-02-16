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

  // Get all quiz questions
  getAll: async () => {
    try {
      return await QuizQuestion.find();
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
};
