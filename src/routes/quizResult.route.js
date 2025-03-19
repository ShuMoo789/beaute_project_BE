const express = require("express");
const quizResultController = require("../controllers/quizResult.controller");
const quizResult = express.Router(); // Khai báo router

// Định nghĩa API
quizResult.get("/", quizResultController.getAllQuizResults);
quizResult.get("/:id", quizResultController.getQuizResultById);

module.exports = quizResult; 
