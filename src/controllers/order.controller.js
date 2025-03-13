const mongoose = require("mongoose");
const OrderService = require("../services/orther.servieces");

const orderController = {
  createOrder: async (req, res) => {
    const { orderDate, cartId, products } = req.body;
    try {
      const newOrder = await OrderService.createOrder(
        orderDate,
        cartId,
        products
      );
      return res
        .status(newOrder.status)
        .json({ data: newOrder.data, message: newOrder.message });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: error.message || "Lỗi hệ thống",
      });
    }
  },
};

module.exports = orderController;
