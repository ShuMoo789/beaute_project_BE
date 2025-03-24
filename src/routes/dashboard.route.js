const express = require("express");
const dashboardController = require("../controllers/dashboard.controller");

const dasboardRouter = express.Router();

dasboardRouter.get("/orders-by-date", dashboardController.getOrdersByDate);
dasboardRouter.get("/orders-by-date-and-status", dashboardController.getOrdersByDateAndStatus);

module.exports = dasboardRouter;
