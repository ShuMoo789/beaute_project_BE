const express = require("express");
const categoryController = require("../controllers/category.controller");

const categoryRouter = express.Router();

// Create a new category
categoryRouter.post("/", categoryController.create);

// Get all categories
categoryRouter.get("/", categoryController.getAll);

// Get a single category by ID
categoryRouter.get("/:id", categoryController.getById);

module.exports = categoryRouter;
