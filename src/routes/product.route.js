const express = require("express");
const productController = require("../controllers/product.controller");

const productRouter = express.Router();

// Basic CRUD routes
productRouter.get("/flashsale", productController.getProductsByDiscountRange);
productRouter.get("/", productController.getAll);
productRouter.post("/", productController.create);
productRouter.put("/:id", productController.update);
productRouter.get("/:id", productController.getById);
productRouter.delete("/:id", productController.delete);

// Additional specialized routes
// productRouter.get("/price-range", productController.getByPriceRange);
// productRouter.patch("/:id/inventory", productController.updateInventory);

module.exports = productRouter;
