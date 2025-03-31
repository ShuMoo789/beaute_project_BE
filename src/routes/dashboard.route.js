const express = require("express");
const dashboardController = require("../controllers/dashboard.controller");

const dasboardRouter = express.Router();

dasboardRouter.get("/orders-by-date", dashboardController.getOrdersByDate);
dasboardRouter.get("/orders-by-date-and-status", dashboardController.getOrdersByDateAndStatus);
dasboardRouter.get("/user-by-role-date", dashboardController.getAccountByRoleByDate);
dasboardRouter.get("/user-done-quiz", dashboardController.getCustomerDoneQuiz);
module.exports = dasboardRouter;
