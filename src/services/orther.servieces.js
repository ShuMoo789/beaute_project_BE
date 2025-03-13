const mongoose = require("mongoose");
const Cart = require("../models/cart.model");
const orderModel = require("../models/order.model");

module.exports = {
  // Tạo đơn hàng
  createOrder: async (orderDate, cartId, products) => {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        throw {
          status: 400,
          ok: false,
          message: "Giỏ hàng không tồn tại!",
        };
      }
      const totalAmount = products.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );
      const newOrder = await orderModel.create({
        orderDate,
        cartId,
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
};
