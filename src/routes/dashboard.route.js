const express = require("express");
const dashboardController = require("../controllers/dashboard.controller");

const dasboardRouter = express.Router();

dasboardRouter.get("/orders-by-date", dashboardController.getOrdersByDate);
dasboardRouter.get("/orders-by-date-and-status", dashboardController.getOrdersByDateAndStatus);
dasboardRouter.get("/orders-by-isPaid", dashboardController.getOrderIsPaidByDate);
dasboardRouter.get("/customer-by-date", dashboardController.getCustomerByDate);
dasboardRouter.get("/staff-by-date", dashboardController.getStaffByDate);
dasboardRouter.get("/user-done-quiz", dashboardController.getCustomerDoneQuiz);
module.exports = dasboardRouter;
