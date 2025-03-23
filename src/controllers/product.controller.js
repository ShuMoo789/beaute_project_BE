const { jwtDecode } = require("jwt-decode");
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

    // Get all products with optional filters
    getAll: async (req, res) => {
        const bearerToken = req.headers.authorization;
        const token = bearerToken.split(" ")[1];
        const role = jwtDecode(token).role;
        const { page = 1, pageSize = 58, ...filters } = req.query; // Extract page and pageSize from query parameters and use the rest as filters
        console.log(role)
        try {
            if (role.includes('customer')) {
                const data = await productServices.getAll(filters, page, pageSize);
                return res.json(data);
            } else {
                const data = await productServices.getAllDashboard(filters, page, pageSize);
                return res.json(data);
            }

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
            console.log(error)
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
    },

    // Get products by product discount range
    getProductsByDiscountRange: async (req, res) => {
        const { minDiscount, maxDiscount } = req.query;

        try {
            const products = await productServices.getByProductDiscountRange(minDiscount, maxDiscount);
            res.status(200).json(products);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    },
};
