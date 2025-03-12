const express = require("express");
const productController = require("../controllers/product.controller");

const productRouter = express.Router();

// Basic CRUD routes
productRouter.post("/", productController.create);
productRouter.get("/", productController.getAll);
productRouter.get("/:id", productController.getById);
productRouter.put("/:id", productController.update);
productRouter.delete("/:id", productController.delete);

// Additional specialized routes
// productRouter.get("/price-range", productController.getByPriceRange);
// productRouter.patch("/:id/inventory", productController.updateInventory);

module.exports = productRouter;
