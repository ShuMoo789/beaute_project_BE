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

  getAllOrder: async (req, res) => {
    try {
      const orders = await OrderService.getAllOrder();
      return res.status(200).json({
        ok: true,
        message: "Lấy danh sách đơn hàng thành công",
        orders,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: error.message || "Lỗi hệ thống khi lấy đơn hàng!",
      });
    }
  },

  getOrderById: async (req, res) => {
    try {
      const { orderId } = req.params; // Lấy id từ params
      const order = await OrderService.getOrderById(orderId);
      return res.status(200).json({
        ok: true,
        message: "Lấy thông tin đơn hàng thành công",
        order,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: error.message || "Lỗi hệ thống khi lấy đơn hàng!",
      });
    }
  },
};

module.exports = orderController;
