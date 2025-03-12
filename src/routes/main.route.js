const authRouter = require("./auth.route");
const categoryRouter = require("./category.route");
const imgRoute = require("./img.route");
const quizAnswerRouter = require("./quizAnswer.route");
const quizQuestionRouter = require("./quizQuestion.route");
const skinTypeRouter = require("./skinType.route");
const productRouter = require("./product.route");
const routineStep = require("./routineStep.route");
const routine = require("./routine.route");
const cart = require("./cart.route");

const initRoutes = (app) => {
  app.use("/api/category", categoryRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/uploadImg", imgRoute);
  app.use("/api/quiz-question", quizQuestionRouter);
  app.use("/api/quiz-answer", quizAnswerRouter);
  app.use("/api/skin-types", skinTypeRouter);
  app.use("/api/product", productRouter);
  app.use("/api/routine-step", routineStep);
  app.use("/api/routine", routine);
  app.use("/api/cart", cart);
};

module.exports = initRoutes;
//server http/locahost:8080/api/category/
