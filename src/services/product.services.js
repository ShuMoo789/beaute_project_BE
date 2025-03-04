const Product = require("../models/product.model");

module.exports = {
  // Create a new product
  create: async (formData) => {
    try {
      const product = new Product(formData);
      await product.save();
      return product;
    } catch (error) {
      console.log(error)
      throw { status: 500, message: "Failed to create product" };
    }
  },

  // Get all products
  getAll: async (page = 1, pageSize = 10) => {
    try {
      // Convert page & pageSize to numbers
      page = parseInt(page);
      pageSize = parseInt(pageSize);
  
      // Calculate offset
      const skip = (page - 1) * pageSize;
  
      // Fetch paginated products
      const products = await Product.find()
        .populate('skinTypeId')
        .populate('cartId')
        .populate('stepRoutineId')
        .populate('voucherId')
        .populate('category')
        .skip(skip)
        .limit(pageSize);
  
      // Get total count of products
      const totalItem = await Product.countDocuments();
  
      return {
        totalItem,
        page,
        pageSize,
        totalPages: Math.ceil(totalItem / pageSize),
        data: products,
      };
    } catch (error) {
      throw { status: 500, message: "Failed to retrieve products" };
    }
  },
  

  // Get a single product by ID
  getById: async (id) => {
    try {
      return await Product.findById(id)
        .populate('skinTypeId')
        .populate('cartId')
        .populate('stepRoutineId')
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
  },

  // New methods based on updated model

  // Get products by skin type
  getBySkinType: async (skinTypeId) => {
    try {
      return await Product.find({ skinTypeId });
    } catch (error) {
      throw { status: 500, message: "Failed to retrieve products by skin type" };
    }
  },

  // Get products by usage time
  getByUsageTime: async (usageTime) => {
    try {
      return await Product.find({ usageTime });
    } catch (error) {
      throw { status: 500, message: "Failed to retrieve products by usage time" };
    }
  },

  // Get products by origin
  getByOrigin: async (origin) => {
    try {
      return await Product.find({ origin });
    } catch (error) {
      throw { status: 500, message: "Failed to retrieve products by origin" };
    }
  }
};
