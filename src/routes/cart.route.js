const express = require("express");
const cart = require("../controllers/cart.controller");
const cartRouter = express.Router();

cartRouter.post("/addToCart", cart.addToCart);
cartRouter.get("/getCartInfor/:customerId", cart.getCart);
cartRouter.put("/updateQuantity", cart.updateProductQuantity);
cartRouter.delete("/remove", cart.removeProductsFromCart);

module.exports = cartRouter;
