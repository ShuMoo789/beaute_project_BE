const express = require("express");
const quizAnswerController = require("../controllers/quizAnswer.controller");

const quizAnswerRouter = express.Router();

quizAnswerRouter.post("/", quizAnswerController.create);
quizAnswerRouter.get("/", quizAnswerController.getAll);
quizAnswerRouter.get("/question/:questionId", quizAnswerController.getByQuestionId);
quizAnswerRouter.get("/:id", quizAnswerController.getById);
quizAnswerRouter.put("/:id", quizAnswerController.update);
quizAnswerRouter.delete("/:id", quizAnswerController.delete);

module.exports = quizAnswerRouter;
