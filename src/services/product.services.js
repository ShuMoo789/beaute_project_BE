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

  // Get all products with optional filters
  getAll: async (filters = {}, page = 1, pageSize = 58) => {
    try {
      // Convert page & pageSize to numbers
      page = parseInt(page);
      pageSize = parseInt(pageSize);

      // Validate filter fields
      const validFields = ['name', 'brand', 'category', 'price', 'skinTypeId', 'stepRoutineId', 'productDiscount', 'inventory'];
      const invalidFields = Object.keys(filters).filter(field => !validFields.includes(field));
      if (invalidFields.length > 0) {
        throw { status: 400, message: `Invalid filter fields: ${invalidFields.join(', ')}` };
      }
  
      // Calculate offset
      const skip = (page - 1) * pageSize;
  
      // Fetch paginated products with filters
      const products = await Product.find(filters)
        .populate('skinTypeId')
        .populate('stepRoutineId')
        .populate('category')
        .skip(skip)
        .limit(pageSize);
  
      // Get total count of products
      const totalItem = await Product.countDocuments(filters);
  
      return {
        totalItem,
        page,
        pageSize,
        totalPages: Math.ceil(totalItem / pageSize),
        data: products,
      };
    } catch (error) {
      throw { status: error.status || 500, message: error.message || "Failed to retrieve products" };
    }
  },
  

  // Get a single product by ID
  getById: async (id) => {
    try {
      return await Product.findById(id)
        .populate('skinTypeId')
        .populate('stepRoutineId')
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
  },

  // Get products by brand
  getByBrand: async (brand) => {
    try {
      return await Product.find({ brand });
    } catch (error) {
      throw { status: 500, message: "Failed to retrieve products by brand" };
    }
  },

  // Get products by product discount range
  getByProductDiscountRange: async (minDiscount, maxDiscount) => {
    try {
      return await Product.find({
        productDiscount: { $gte: minDiscount, $lte: maxDiscount }
      }).populate('category');
    } catch (error) {
      throw { status: 500, message: "Failed to retrieve products by discount range" };
    }
  }
};
