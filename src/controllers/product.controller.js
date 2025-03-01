const productServices = require("../services/product.services");

module.exports = {
    // Create a new product
    create: async (req, res) => {
        const { name, description, price, category, inventory, StaffId, cartId, stepRotineId, VoucherId } = req.body;

        // Validate required fields
        if (!name || !description || !category) {
            return res.status(400).json({ message: "Name, description, and category are required" });
        }

        try {
            const data = await productServices.create(req.body);
            return res.status(201).json(data);
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message });
        }
    },

    // Get all products
    getAll: async (req, res) => {
        try {
            const data = await productServices.getAll();
            return res.json(data);
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message });
        }
    },

    // Get a single product by ID
    getById: async (req, res) => {
        const { id } = req.params;
        try {
            const data = await productServices.getById(id);
            if (!data) {
                return res.status(404).json({ message: "Product not found" });
            }
            return res.json(data);
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message });
        }
    },

    // Update a product
    update: async (req, res) => {
        const { id } = req.params;
        try {
            const data = await productServices.update(id, req.body);
            if (!data) {
                return res.status(404).json({ message: "Product not found" });
            }
            return res.json(data);
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const data = await productServices.delete(id);
            if (!data) {
                return res.status(404).json({ message: "Product not found" });
            }
            return res.json(data);
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message });
        }
    },
};
