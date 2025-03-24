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

  getAll: async (filters = {}, page = 1, pageSize = 58) => {
    try {
      // Convert page & pageSize to numbers
      page = parseInt(page);
      pageSize = parseInt(pageSize);
  
      // Validate filter fields
      const validFields = ['name', 'brand', 'category', 'price', 'skinTypeId', 'stepRoutineId', 'productDiscount', 'inventory', 'usageTime', 'origin', 'volume', 'rating', 'priority', 'expiredDate','_id'];
      const invalidFields = Object.keys(filters).filter(field => !validFields.includes(field));
      if (invalidFields.length > 0) {
        throw { status: 400, message: `Invalid filter fields: ${invalidFields.join(', ')}` };
      }
  
      // Calculate offset
      const skip = (page - 1) * pageSize;
  
      // Fetch paginated products with filters, sorted by priority descending
      const products = await Product.find({ ...filters, expiredDate: { $gte: new Date() }, active: true })
        .sort({ priority: -1, rating: -1, expiredDate: 1 }) // Sort priority true first
        .populate('skinTypeId', '_id, type')
        .populate('category')
        .skip(skip)
        .limit(pageSize);
  
      // Get total count of products
      const totalItem = await Product.countDocuments({ ...filters, active: true });
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
  getAllDashboard: async (filters = {}, page = 1, pageSize = 58) => {
    try {
      // Convert page & pageSize to numbers
      page = parseInt(page);
      pageSize = parseInt(pageSize);
  
      // Validate filter fields
      const validFields = ['name', 'brand', 'category', 'price', 'skinTypeId', 'stepRoutineId', 'productDiscount', 'inventory', 'usageTime', 'origin', 'volume', 'rating', 'priority', 'expiredDate','_id'];
      const invalidFields = Object.keys(filters).filter(field => !validFields.includes(field));
      if (invalidFields.length > 0) {
        throw { status: 400, message: `Invalid filter fields: ${invalidFields.join(', ')}` };
      }
  
      // Calculate offset
      const skip = (page - 1) * pageSize;
  
      // Fetch paginated products with filters, sorted by priority descending
      const products = await Product.find({ ...filters, expiredDate: { $gte: new Date() } })
        .sort({ priority: -1, rating: -1, expiredDate: 1 }) // Sort priority true first
        .populate('skinTypeId', '_id, type')
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
        .populate('skinTypeId', '_id, type')
    } catch (error) {
      console.log(error)
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

  // Get products by product discount range
  getByProductDiscountRange: async (minDiscount, maxDiscount) => {
    try {
      console.log(Product.find({
        productDiscount: { $gte: minDiscount, $lte: maxDiscount }
      }).populate('category'))
      return await Product.find({
        productDiscount: { $gte: minDiscount, $lte: maxDiscount }
      }).populate('category');
    } catch (error) {
      console.log(error)
      throw { status: 500, message: "Failed to retrieve products by discount range" };
    }
  }
};
