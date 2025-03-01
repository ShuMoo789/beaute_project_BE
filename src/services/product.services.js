const Product = require("../models/product.model");

module.exports = {
  // Create a new product
  create: async (formData) => {
    try {
      const product = new Product(formData);
      await product.save();
      return product;
    } catch (error) {
      throw { status: 500, message: "Failed to create product" };
    }
  },

  // Get all products
  getAll: async () => {
    try {
      return await Product.find()
        .populate('staffId')
        .populate('cartId')
        .populate('stepRotineId')
        .populate('voucherId');
    } catch (error) {
      throw { status: 500, message: "Failed to retrieve products" };
    }
  },

  // Get a single product by ID
  getById: async (id) => {
    try {
      return await Product.findById(id)
        .populate('staffId')
        .populate('cartId')
        .populate('stepRotineId')
        .populate('voucherId');
    } catch (error) {
      throw { status: 500, message: "Failed to retrieve product" };
    }
  },

  // Update a product
  update: async (id, formData) => {
    try {
      return await Product.findByIdAndUpdate(id, formData, {
        new: true,
        runValidators: true
      });
    } catch (error) {
      throw { status: 500, message: "Failed to update product" };
    }
  },

  // Delete a product
  delete: async (id) => {
    try {
      return await Product.findByIdAndDelete(id);
    } catch (error) {
      throw { status: 500, message: "Failed to delete product" };
    }
  },

  // Additional useful methods

  // Get products by category
  getByCategory: async (category) => {
    try {
      return await Product.find({ category });
    } catch (error) {
      throw { status: 500, message: "Failed to retrieve products by category" };
    }
  },

  // Get products by price range
  getByPriceRange: async (minPrice, maxPrice) => {
    try {
      return await Product.find({
        price: { $gte: minPrice, $lte: maxPrice }
      });
    } catch (error) {
      throw { status: 500, message: "Failed to retrieve products by price range" };
    }
  },

  // Update product inventory
  updateInventory: async (id, quantity) => {
    try {
      return await Product.findByIdAndUpdate(
        id,
        { $inc: { inventory: quantity } },
        { new: true, runValidators: true }
      );
    } catch (error) {
      throw { status: 500, message: "Failed to update product inventory" };
    }
  }
};
