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
};
