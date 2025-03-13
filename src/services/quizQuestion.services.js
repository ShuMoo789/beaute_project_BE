const QuizQuestion = require("../models/quizQuestion.model");
const quizAnswerServices = require("./quizAnswer.services");

module.exports = {
  // Create a new quiz question
  create: async (formData) => {
    try {
      const { title, description, answers } = formData; // Extracting directly from formData
      const quizQuestion = new QuizQuestion({ title, description });
      await quizQuestion.save();

      // Assuming QuizAnswer is the model for answers
      if (answers && answers.length > 0) { // Check if answers array is provided
        const result = await quizAnswerServices.create(quizQuestion._id, answers); // Pass the answers array
      }

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
      return await QuizQuestion.findById(id).populate('answers');
    } catch (error) {
      throw { status: 500, message: "Failed to retrieve quiz question" };
    }
  },

  // Update a quiz question
  update: async (id, formData) => {
    try {
      const { title, description, answers } = formData; // Extracting title, description, and answers
      const updatedQuestion = await QuizQuestion.findByIdAndUpdate(id, { title, description }, { new: true });

      // Update answers if provided
      if (answers) {
        // Update each answer using quizAnswerServices.update
        for (const answer of answers) {
          if (answer._id) {
            await quizAnswerServices.update(answer._id, {question: updatedQuestion._id,text: answer.text, point: answer.point });
          } else {
            // If there's no _id, it means it's a new answer, handle accordingly
            const newAnswer = await quizAnswerServices.create(updatedQuestion._id, [{ text: answer.text, point: answer.point }]);
          }
        }
      }

      return updatedQuestion.populate('answers');
    } catch (error) {
      console.log(first)
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
