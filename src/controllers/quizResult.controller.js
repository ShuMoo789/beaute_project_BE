const quizResultServices = require('../services/quizResult.services'); // Adjust the path to your quizResult.services file

/**
 * Controller to get all quiz results.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const getAllQuizResults = async (req, res, next) => {
  try {
    const quizResults = await quizResultServices.getAll();
    res.status(200).json(quizResults);
  } catch (error) {
    console.log(error)
  }
};

/**
 * Controller to get a quiz result by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const getQuizResultById = async (req, res, next) => {
  try {
    const { id } = req.params; // Extract ID from route parameters
    const quizResult = await quizResultServices.getById(id);
    res.status(200).json(quizResult);
  } catch (error) {
    console.log(error)
  }
};

// Export the controller functions for use in routes
module.exports = {
  getAllQuizResults,
  getQuizResultById,
};