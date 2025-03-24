const authRouter = require("./auth.route");
const categoryRouter = require("./category.route");
const imgRoute = require("./img.route");
const quizAnswerRouter = require("./quizAnswer.route");
const quizQuestionRouter = require("./quizQuestion.route");
const skinTypeRouter = require("./skinType.route");
const productRouter = require("./product.route");
const routine = require("./routine.route");
const cart = require("./cart.route");
const paymemtRoute = require("./payment.route");
const orderRoute = require("./order.route");
const quizResultRouter = require("./quizResult.route");
const dashboardRouter = require("./dashboard.route")

const initRoutes = (app) => {
  app.use("/api/category", categoryRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/uploadImg", imgRoute);
  app.use("/api/quiz-question", quizQuestionRouter);
  app.use("/api/quiz-answer", quizAnswerRouter);
  app.use("/api/skin-types", skinTypeRouter);
  app.use("/api/product", productRouter);
  app.use("/api/routine", routine);
  app.use("/api/cart", cart);
  app.use("/api/payment", paymemtRoute);
  app.use("/api/order", orderRoute);
  app.use("/api/quiz-result", quizResultRouter);
  app.use("/api/dashboard", dashboardRouter);
};

module.exports = initRoutes;
//server http/locahost:8080/api/category/
