const express = require("express");
const quizQuestionController = require("../controllers/quizQuestion.controller");

const quizQuestionRouter = express.Router();

// Routes for Quiz Questions
quizQuestionRouter.get("/", quizQuestionController.getAll);
quizQuestionRouter.get("/:id", quizQuestionController.getById);
quizQuestionRouter.post("/", quizQuestionController.create);
quizQuestionRouter.put("/:id", quizQuestionController.update);
quizQuestionRouter.delete("/:id", quizQuestionController.delete);

module.exports = quizQuestionRouter;
