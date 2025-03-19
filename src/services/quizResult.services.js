const QuizResult = require('../models/quizResult.model'); // Adjust the path to your QuizResult model

/**
 * Retrieves all quiz results from the database.
 * @returns {Promise<Array>} An array of quiz result documents.
 * @throws {Error} If the retrieval fails.
 */
const getAll = async () => {
  try {
    const quizResults = await QuizResult.find()
      .populate('userId', 'username name') // Populate userId with name and email from User model
      .populate('result', 'type description'); // Populate result with type and description from SkinType model
    return quizResults;
  } catch (error) {
    throw new Error(`Failed to retrieve quiz results: ${error.message}`);
  }
};

/**
 * Retrieves a quiz result by its ID.
 * @param {string} id - The ID of the quiz result to retrieve.
 * @returns {Promise<Object>} The quiz result document.
 * @throws {Error} If the quiz result is not found or retrieval fails.
 */
const getById = async (id) => {
  try {
    const quizResult = await QuizResult.findById(id)
      .populate('userId', 'username name') // Populate userId with name and email from User model
      .populate('result', 'type description'); // Populate result with type and description from SkinType model
    if (!quizResult) {
      throw new Error('Quiz result not found');
    }
    return quizResult;
  } catch (error) {
    throw new Error(`Failed to retrieve quiz result: ${error.message}`);
  }
};

// Export the functions for use in other parts of the application
module.exports = {
  getAll,
  getById,
};