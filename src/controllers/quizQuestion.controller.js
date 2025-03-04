const quizQuestionServices = require("../services/quizQuestion.services");

module.exports = {
  // Create a new quiz question
  create: async (req, res) => {
    const formData = req.body;

    if (!formData.title) {
      return res.status(400).json({ message: "Title is required" });
    }
    if (!formData.description) {
      return res.status(400).json({ message: "Description is required" });
    }

    try {
      const data = await quizQuestionServices.create(formData);
      return res.status(201).json(data);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  },

  // Get all quiz questions
  getAll: async (req, res) => {
    try {
      const data = await quizQuestionServices.getAll();
      return res.json(data);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  },

  // Get a single quiz question by ID
  getById: async (req, res) => {
    const { id } = req.params;
    try {
      const data = await quizQuestionServices.getById(id);
      if (!data) {
        return res.status(404).json({ message: "Quiz question not found" });
      }
      return res.json(data);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  },

  // Update a quiz question
  update: async (req, res) => {
    const { id } = req.params;
    const formData = req.body;

    try {
      const data = await quizQuestionServices.update(id, formData);
      if (!data) {
        return res.status(404).json({ message: "Quiz question not found" });
      }
      return res.json(data);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  },

  // Delete a quiz question
  delete: async (req, res) => {
    const { id } = req.params;

    try {
      const data = await quizQuestionServices.delete(id);
      if (!data) {
        return res.status(404).json({ message: "Quiz question not found" });
      }
      return res.json({ message: "Quiz question deleted successfully" });
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  },

  // Add an answer to a question
  addAnswer: async (req, res) => {
    const { questionId, answerId } = req.body;

    if (!questionId || !answerId) {
      return res.status(400).json({ message: "Question ID and Answer ID are required" });
    }

    try {
      const data = await quizQuestionServices.addAnswer(questionId, answerId);
      return res.json(data);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  },

  // Remove an answer from a question
  removeAnswer: async (req, res) => {
    const { questionId, answerId } = req.body;

    if (!questionId || !answerId) {
      return res.status(400).json({ message: "Question ID and Answer ID are required" });
    }

    try {
      const data = await quizQuestionServices.removeAnswer(questionId, answerId);
      return res.json(data);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  },

  // Get all answers for a specific question
  getAnswers: async (req, res) => {
    const { questionId } = req.params;

    try {
      const data = await quizQuestionServices.getAnswers(questionId);
      return res.json(data);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }
};
