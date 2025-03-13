const Cart = require("../models/cart.model");
const orderModel = require("../models/order.model");

module.exports = {
  // Tao don hang
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
};
