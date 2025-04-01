const mongoose = require("mongoose");
const User = require("../models/user.model");
const Order = require("../models/order.model");
const SkinType = require("../models/skinType.model");
const Product = require("../models/product.model");

module.exports = {
  getOrderByDate: async (startDate, endDate) => {
    try {
      // Chuyển đổi ngày bắt đầu và ngày kết thúc sang kiểu Date
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Đảm bảo endDate lấy đến hết ngày (23:59:59)
      end.setHours(23, 59, 59, 999);

      // Truy vấn đơn hàng trong khoảng thời gian
      const orders = await Order.find({
        orderDate: { $gte: start, $lte: end },
      })
        .populate("products.productId", "name quantity") // Lấy thêm thông tin sản phẩm
        .sort({ orderDate: -1 }); // Sắp xếp theo thời gian mới nhất

      return {
        status: 200,
        ok: true,
        message: "Lấy danh sách đơn hàng thành công",
        data: orders,
      };
    } catch (error) {
      throw {
        status: error.status || 500,
        ok: false,
        message: error.message || "Lỗi hệ thống",
      };
    }
  },

  getOrderByDateAndStatus: async (startDate, endDate, status) => {
    try {
      // Chuyển đổi ngày bắt đầu và ngày kết thúc sang kiểu Date
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Đảm bảo endDate lấy đến hết ngày (23:59:59)
      end.setHours(23, 59, 59, 999);

      // Truy vấn đơn hàng trong khoảng thời gian
      const orders = await Order.find({
        orderDate: { $gte: start, $lte: end },
        status,
      })
        .populate("products.productId", "name quantity") // Lấy thêm thông tin sản phẩm
        .sort({ orderDate: -1 }); // Sắp xếp theo thời gian mới nhất

      const ordersQuantity = orders.length;
      return {
        status: 200,
        ok: true,
        message: "Lấy danh sách đơn hàng thành công",
        quantity: ordersQuantity,
      };
    } catch (error) {
      throw {
        status: error.status || 500,
        ok: false,
        message: error.message || "Lỗi hệ thống",
      };
    }
  },

  getOrderIsPaidByDate: async (startDate, endDate, isPaid) => {
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);

      end.setHours(23, 59, 59, 999);

      const orders = await Order.find({
        orderDate: { $gte: start, $lte: end },
        isPaid,
      })
        .populate("products.productId", "name quantity")
        .sort({ orderDate: -1 });

      const ordersQuantity = orders.length;
      return {
        status: 200,
        ok: true,
        message: "Lấy danh sách đơn hàng thành công",
        quantity: ordersQuantity,
      };
    } catch (error) {
      throw {
        status: error.status || 500,
        ok: false,
        message: error.message || "Lỗi hệ thống",
      };
    }
  },

  getCustomerByDate: async (startDate, endDate) => {
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      const users = await User.find({
        createdAt: { $gte: start, $lte: end },
        role: "customer", // role là một mảng nên cần dùng $in
      }).sort({ createdAt: -1 }); // Sắp xếp theo thời gian tạo

      const usersQuantity = users.length;

      return {
        status: 200,
        ok: true,
        message: "Lấy danh sách người dùng thành công",
        quantity: usersQuantity,
      };
    } catch (error) {
      return {
        status: error.status || 500,
        ok: false,
        message: error.message || "Lỗi hệ thống",
      };
    }
  },

  getStaffByDate: async (startDate, endDate) => {
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      const users = await User.find({
        createdAt: { $gte: start, $lte: end },
        role: "staff",
      }).sort({ createdAt: -1 }); // Sắp xếp theo thời gian tạo

      const usersQuantity = users.length;

      return {
        status: 200,
        ok: true,
        message: "Lấy danh sách người dùng thành công",
        quantity: usersQuantity,
      };
    } catch (error) {
      return {
        status: error.status || 500,
        ok: false,
        message: error.message || "Lỗi hệ thống",
      };
    }
  },

  getCustomerDoneQuiz: async (startDate, endDate) => {
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      const users = await User.find({
        createdAt: { $gte: start, $lte: end },
        role: "customer",
        skinType: { $ne: null },
      }).sort({ createdAt: -1 });

      const usersQuantity = users.length;

      return {
        status: 200,
        ok: true,
        message: "Lấy danh sách người dùng thành công",
        quantity: usersQuantity,
      };
    } catch (error) {
      return {
        status: error.status || 500,
        ok: false,
        message: error.message || "Lỗi hệ thống",
      };
    }
  },
};
