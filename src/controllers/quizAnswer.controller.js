const quizAnswerServices = require("../services/quizAnswer.services");

module.exports = {
    // Create a new quiz answer
    create: async (req, res) => {
        const { questionId, text } = req.body;

        if (!questionId) {
            return res.status(400).json({ message: "Question ID is required" });
        }
        if (!text) {
            return res.status(400).json({ message: "Answer text is required" });
        }

        try {
            const data = await quizAnswerServices.create(questionId, { text });
            return res.status(201).json(data);
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message });
        }
    },

    // Get all quiz answers
    getAll: async (req, res) => {
        try {
            const data = await quizAnswerServices.getAll();
            return res.json(data);
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message });
        }
    },

    // Get all answers for a specific quiz question
    getByQuestionId: async (req, res) => {
        const { questionId } = req.params;
        try {
            const data = await quizAnswerServices.getByQuestionId(questionId);
            return res.json(data);
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message });
        }
    },

    // Get a single quiz answer by ID
    getById: async (req, res) => {
        const { id } = req.params;
        try {
            const data = await quizAnswerServices.getById(id);
            if (!data) {
                return res.status(404).json({ message: "Quiz answer not found" });
            }
            return res.json(data);
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message });
        }
    },

    // Update a quiz answer
    update: async (req, res) => {
        const { id } = req.params;
        const { text, point, question } = req.body;
        if (point === undefined || point < 0) {
            return res.status(400).json({ message: "Point must be a non-negative number" });
        }
    
        try {
            const data = await quizAnswerServices.update(id, { text, point, question });
            if (!data) {
                return res.status(404).json({ message: "Quiz answer not found" });
            }
            return res.json(data);
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message });
        }
    },
    

    // Delete a quiz answer
    delete: async (req, res) => {
        const { id } = req.params;

        try {
            const data = await quizAnswerServices.delete(id);
            if (!data) {
                return res.status(404).json({ message: "Quiz answer not found" });
            }
            return res.json({ message: "Quiz answer deleted successfully" });
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message });
        }
    },
};
