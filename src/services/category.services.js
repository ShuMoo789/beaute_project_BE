const Category = require("../models/category.model");

module.exports = {
  // Create a new category
  create: async (formData) => {
    try {
      const category = new Category(formData);
      await category.save();
      return category;
    } catch (error) {
      if (error.code === 11000) { // MongoDB duplicate key error code
        throw { status: 400, message: "Category name already exists" };
      }
      throw { status: 500, message: "Failed to create category" };
    }
  },

  // Get all categories
  getAll: async () => {
    try {
      return await Category.find().sort({ name: 1 }); // Sort alphabetically by name
    } catch (error) {
      throw { status: 500, message: "Failed to retrieve categories" };
    }
  },

  // Get a single category by ID
  getById: async (id) => {
    try {
      const category = await Category.findById(id);
      if (!category) {
        throw { status: 404, message: "Category not found" };
      }
      return category;
    } catch (error) {
      if (error.status === 404) throw error;
      throw { status: 500, message: "Failed to retrieve category" };
    }
  }
};
