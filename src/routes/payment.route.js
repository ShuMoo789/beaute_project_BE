const express = require("express");
const paymentController = require("../controllers/payment.controller");
const paymemtRoute = express.Router();

paymemtRoute.post("/create", paymentController.createPayment);
paymemtRoute.post("/check-payment", paymentController.checkPayment);

module.exports = paymemtRoute;
