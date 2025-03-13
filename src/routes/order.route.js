const express = require("express");
const orderController = require("../controllers/order.controller");
const orderRoute = express.Router();

orderRoute.post("/createOrder", orderController.createOrder);

module.exports = orderRoute;
