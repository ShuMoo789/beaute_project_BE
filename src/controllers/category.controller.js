const categoryServices = require("../services/category.services");

module.exports = {
  // Create a new category
  create: async (req, res) => {
    const { name } = req.body;

    // Validate required field
    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    try {
      const data = await categoryServices.create({ name });
      return res.status(201).json(data);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  },

  // Get all categories
  getAll: async (req, res) => {
    try {
      const data = await categoryServices.getAll();
      return res.json(data);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  },

  // Get a single category by ID
  getById: async (req, res) => {
    const { id } = req.params;
    
    try {
      const data = await categoryServices.getById(id);
      return res.json(data);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }
};
