const express = require("express");
const orderController = require("../controllers/order.controller");
const orderRoute = express.Router();

orderRoute.post("/createOrder", orderController.createOrder);
orderRoute.get("/getAllOrder", orderController.getAllOrder);
orderRoute.get("/getOrderById/:orderId", orderController.getOrderById);
orderRoute.get("/getOrderByStatus", orderController.getOrderByStatus);
orderRoute.put("/updateOrderCancel", orderController.putOrderByCancel);
module.exports = orderRoute;
