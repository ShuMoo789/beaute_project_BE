const mongoose = require("mongoose");
const { jwtDecode } = require("jwt-decode");
const OrderService = require("../services/order.servieces");

const orderController = {
  createOrder: async (req, res) => {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split(" ")[1];
      const customerId = jwtDecode(token).id;
      const { products, address } = req.body;
      const newOrder = await OrderService.createOrder(
        customerId,
        products,
        address
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
      const { page = 1, pageSize = 10 } = req.query;
      const result = await OrderService.getAllOrder(page, pageSize);
      return res.status(200).json({
        ok: true,
        message: "Lấy danh sách đơn hàng thành công",
        data: result.data
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: error.message || "Lỗi hệ thống khi lấy đơn hàng!"
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

  getOrderByStatus: async (req, res) => {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split(" ")[1];
      const customerId = jwtDecode(token).id;
      const { status, isPaid, page = 1, pageSize = 10 } = req.query;
      
      const result = await OrderService.getOrderByStatus(
        customerId, 
        status, 
        isPaid,
        page,
        pageSize
      );
      
      return res.status(200).json({
        ok: true,
        status: 200,
        message: "Lấy danh sách đơn hàng thành công",
        data: result.data
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: error.message || "Lỗi hệ thống khi lấy đơn hàng!"
      });
    }
  },

  getOrderByStatusDashboard: async (req, res) => {
    try {
      const { status } = req.query;
      const orders = await OrderService.getOrderByStatusDashboard(status);
      return res.status(200).json({
        ok: true,
        status: 200,
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

  putOrderByCancel: async (req, res) => {
    try {
      const { orderId, cancelReason } = req.body;
      const orders = await OrderService.updateCancelOrder(
        orderId,
        cancelReason
      );
      return res.status(200).json({
        ok: true,
        status: 200,
        orders,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: error.message || "Lỗi hệ thống khi lấy đơn hàng!",
      });
    }
  },

  putStatusOrderById: async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.query;
      const orders = await OrderService.updateStatusOrderById(orderId, status);
      return res.status(200).json({
        ok: true,
        status: 200,
        orders,
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
