const mongoose = require("mongoose");
const User = require("../models/user.model");
const orderModel = require("../models/order.model");

module.exports = {
  // Tạo đơn hàng
  createOrder: async (customerId, products) => {
    try {
      const user = await User.findById(customerId);
      if (!user) {
        throw {
          status: 400,
          ok: false,
          message: "Người dùng không tồn tại!",
        };
      }
      const totalAmount = products.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );
      const newOrder = await orderModel.create({
        customerId,
        products,
        amount: totalAmount,
        status: "Pending",
      });

      return {
        status: 200,
        ok: true,
        message: "Tao order thanh cong",
        data: newOrder,
      };
    } catch (error) {
      return Promise.reject({
        status: error.status || 500,
        ok: false,
        message: error.message || "Lỗi hệ thống!",
      });
    }
  },

  // Lấy thông tin đơn hàng
  getAllOrder: async () => {
    try {
      const orders = await orderModel.find();
      return {
        status: 200,
        ok: true,
        message: "Lấy danh sách đơn hàng thành công",
        data: orders,
      };
    } catch (error) {
      return Promise.reject({
        status: error.status || 500,
        ok: false,
        message: error.message || "Lỗi hệ thống khi lấy đơn hàng!",
      });
    }
  },

  // Lấy thông tin đơn hàng theo Id
  getOrderById: async (orderId) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        throw {
          status: 400,
          ok: false,
          message: "ID đơn hàng không hợp lệ",
        };
      }
      const order = await orderModel.findById(orderId);
      if (!order) {
        throw {
          status: 404,
          ok: false,
          message: "Không tìm thấy đơn hàng",
        };
      }
      return {
        status: 200,
        ok: true,
        message: "Lấy thông tin đơn hàng thành công",
        order,
      };
    } catch (error) {
      return Promise.reject({
        status: error.status || 500,
        ok: false,
        message: error.message || "Lỗi hệ thống khi lấy đơn hàng!",
      });
    }
  },

  getOrderByStatus: async (customerId, status) => {
    try {
      // Kiểm tra ObjectId hợp lệ
      if (!mongoose.Types.ObjectId.isValid(customerId)) {
        const error = new Error("ID user không hợp lệ");
        error.status = 400;
        throw error;
      }
  
      // Kiểm tra user tồn tại
      const user = await User.findById(customerId).lean();
      if (!user) {
        const error = new Error("Không tìm thấy user");
        error.status = 404;
        throw error;
      }
  
      // Tìm đơn hàng theo customerId và status
      const orders = await orderModel.find({ customerId, status }).lean();
  
      // Nếu không có đơn hàng nào
      if (!orders.length) {
        const error = new Error("Không tìm thấy đơn hàng với trạng thái trên");
        error.status = 404;
        throw error;
      }
  
      return {
        ok: true,
        status: 200,
        message: "Lấy đơn hàng theo trạng thái thành công",
        data: orders,
      };
    } catch (error) {
      console.error("Lỗi khi lấy đơn hàng theo trạng thái:", error);
      return Promise.reject({
        status: error.status || 500,
        ok: false,
        message: error.message || "Lỗi hệ thống khi lấy đơn hàng!",
      });
    }
  },
  
};
