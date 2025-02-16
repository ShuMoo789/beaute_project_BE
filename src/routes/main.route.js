const authRouter = require("./auth.route");
const categoryRouter = require("./category.route");
const imgRoute = require("./img.route");
const quizAnswerRouter = require("./quizAnswer.route");
const quizQuestionRouter = require("./quizQuestion.route");
const userRouter = require("./user.route");

const initRoutes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/category", categoryRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/uploadImg", imgRoute);
  app.use("/api/quiz-question", quizQuestionRouter);
  app.use("/api/quiz-answer", quizAnswerRouter);
};

module.exports = initRoutes;
//server http/locahost:8080/api/category/
