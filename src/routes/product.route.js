const express = require("express");
const productController = require("../controllers/product.controller");

const productRouter = express.Router();

// Basic CRUD routes
productRouter.put("/:id", productController.update);
productRouter.get("/:id", productController.getById);
productRouter.delete("/:id", productController.delete);
productRouter.get("/flashsale", productController.getProductsByDiscountRange);
productRouter.post("/", productController.create);
productRouter.get("/", productController.getAll);

// Additional specialized routes
// productRouter.get("/price-range", productController.getByPriceRange);
// productRouter.patch("/:id/inventory", productController.updateInventory);

module.exports = productRouter;
