const productServices = require("../services/product.services");

module.exports = {
    // Create a new product
    create: async (req, res) => {

        // Validate required fields
        const requiredFields = [
            'image', 'name', 'brand', 'description', 'ingredients',
            'usage', 'price', 'category', 'usageTime', 'origin', 'volume'
        ];
        
        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({ 
                message: `Missing required fields: ${missingFields.join(', ')}` 
            });
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

    // Delete a product
    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const data = await productServices.delete(id);
            if (!data) {
                return res.status(404).json({ message: "Product not found" });
            }
            return res.json({ message: "Product deleted successfully" });
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message });
        }
    },

    // Get products by category
    getByCategory: async (req, res) => {
        const { category } = req.params;
        try {
            const data = await productServices.getByCategory(category);
            return res.json(data);
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message });
        }
    },

    // Get products by price range
    getByPriceRange: async (req, res) => {
        const { minPrice, maxPrice } = req.query;
        
        if (!minPrice || !maxPrice) {
            return res.status(400).json({ message: "Both minPrice and maxPrice are required" });
        }

        try {
            const data = await productServices.getByPriceRange(Number(minPrice), Number(maxPrice));
            return res.json(data);
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message });
        }
    },

    // Get products by skin type
    getBySkinType: async (req, res) => {
        const { skinTypeId } = req.params;
        try {
            const data = await productServices.getBySkinType(skinTypeId);
            return res.json(data);
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message });
        }
    },

    // Get products by usage time
    getByUsageTime: async (req, res) => {
        const { usageTime } = req.params;
        try {
            const data = await productServices.getByUsageTime(usageTime);
            return res.json(data);
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message });
        }
    },

    // Get products by origin
    getByOrigin: async (req, res) => {
        const { origin } = req.params;
        try {
            const data = await productServices.getByOrigin(origin);
            return res.json(data);
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message });
        }
    },

    // Update product inventory
    updateInventory: async (req, res) => {
        const { id } = req.params;
        const { quantity } = req.body;

        if (quantity === undefined) {
            return res.status(400).json({ message: "Quantity is required" });
        }

        try {
            const data = await productServices.updateInventory(id, quantity);
            if (!data) {
                return res.status(404).json({ message: "Product not found" });
            }
            return res.json(data);
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message });
        }
    }
};
