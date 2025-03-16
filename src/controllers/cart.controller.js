const { jwtDecode } = require("jwt-decode");
const cartService = require("../services/cart.services");

module.exports = {
  addToCart: async (req, res) => {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split(" ")[1];
      const customerId = jwtDecode(token).id;
      const { productId, quantity } = req.body;
      const result = await cartService.addToCart(
        customerId,
        productId,
        quantity
      );
      res.status(result.status).json(result);
    } catch (error) {
      res.status(error.status || 500).json(error);
    }
  },

  getCart: async (req, res) => {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split(" ")[1];
      const customerId = jwtDecode(token).id;
      console.log(customerId)
      const result = await cartService.getCart(customerId);
      res.status(result.status).json(result);
    } catch (error) {
      res.status(error.status || 500).json(error);
    }
  },

  updateProductQuantity: async (req, res) => {
    try {
      const { customerId, productId, quantity } = req.body;
      const result = await cartService.updateProductQuantity(
        customerId,
        productId,
        quantity
      );
      res.status(result.status).json(result);
    } catch (error) {
      res.status(error.status || 500).json(error);
    }
  },

  removeProductsFromCart: async (req, res) => {
    try {
      const { customerId, productIds } = req.body;
      const result = await cartService.removeProductsFromCart(
        customerId,
        productIds
      );
      res.status(result.status).json(result);
    } catch (error) {
      res.status(error.status || 500).json(error);
    }
  },
};
