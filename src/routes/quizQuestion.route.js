const express = require("express");
const quizQuestionController = require("../controllers/quizQuestion.controller");

const quizQuestionRouter = express.Router();

// Routes for managing answers in questions
quizQuestionRouter.post("/add-answer", quizQuestionController.addAnswer);
quizQuestionRouter.delete("/remove-answer", quizQuestionController.removeAnswer);
quizQuestionRouter.get("/:questionId/answers", quizQuestionController.getAnswers);
// Basic CRUD routes for Quiz Questions
quizQuestionRouter.get("/", quizQuestionController.getAll);
quizQuestionRouter.get("/:id", quizQuestionController.getById);
quizQuestionRouter.post("/", quizQuestionController.create);
quizQuestionRouter.put("/:id", quizQuestionController.update);
quizQuestionRouter.delete("/:id", quizQuestionController.delete);



module.exports = quizQuestionRouter;
