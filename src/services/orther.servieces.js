const mongoose = require("mongoose");
const User = require("../models/user.model");
const orderModel = require("../models/order.model");
const productModel = require("../models/product.model");
const cartModel = require("../models/cart.model");

module.exports = {
  // Tạo đơn hàng
  createOrder: async (customerId, products) => {
    try {
      // Kiểm tra người dùng tồn tại
      const user = await User.findById(customerId);
      if (!user) {
        throw {
          status: 400,
          ok: false,
          message: "Người dùng không tồn tại!",
        };
      }

      // Lấy danh sách productId từ products
      const productIds = products.map((p) => p.productId);

      // Lấy thông tin sản phẩm từ database
      const dbProducts = await productModel.find({
        _id: { $in: productIds },
      });

      if (!dbProducts.length) {
        throw {
          status: 404,
          ok: false,
          message: "Không tìm thấy sản phẩm!",
        };
      }

      // Tạo map từ productId để lấy quantity dễ dàng
      const productQuantityMap = products.reduce((acc, item) => {
        acc[item.productId] = item.quantity;
        return acc;
      }, {});

      // Xử lý từng sản phẩm để tính totalPriceAfterDiscount
      const updatedProducts = dbProducts.map((product) => {
        const quantity = productQuantityMap[product._id.toString()] || 1;
        const discountPrice =
          product.price * (1 - (product.productDiscount || 0) / 100);
        const totalPriceAfterDiscount = discountPrice * quantity;
        return {
          productId: product._id,
          image: product.image,
          name: product.name,
          price: product.price,
          quantity,
          productDiscount: product.productDiscount,
          totalPriceAfterDiscount,
        };
      });

      // Tính tổng số tiền đơn hàng
      const totalAmount = updatedProducts.reduce((total, product) => {
        return total + product.totalPriceAfterDiscount;
      }, 0);

      // Tạo đơn hàng mới
      const newOrder = await orderModel.create({
        customerId,
        products: updatedProducts,
        amount: totalAmount,
        status: "Pending",
      });

      const cart = await cartModel.findOne({ customerId });
      console.log(customerId);
      if (!cart) {
        return Promise.reject({
          status: 404,
          ok: false,
          message: "Giỏ hàng không tồn tại",
        });
      }
      // Lọc ra những sản phẩm không nằm trong danh sách cần xóa
      cart.products = cart.products.filter(
        (item) => !productIds.includes(item.productId.toString())
      );
      await cart.save();

      return {
        status: 200,
        ok: true,
        message: "Tạo order thành công",
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
      const orders = await orderModel.find().populate("customerId", "-avatar");
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
      const order = await orderModel.findById(orderId).populate("customerId");
      if (!order) {
        throw {
          status: 404,
          ok: false,
          message: "Không tìm thấy đơn hàng",
        };
      }
      return {
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

  // Customer hủy Đơn hàng
  updateCancelOrder: async (orderId, cancelReason) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        throw {
          status: 400,
          ok: false,
          message: "ID đơn hàng không hợp lệ",
        };
      }

      // Tìm đơn hàng trước khi cập nhật
      const order = await orderModel.findById(orderId);
      if (!order) {
        throw {
          status: 404,
          ok: false,
          message: "Không tìm thấy đơn hàng",
        };
      }
      if (order.status === "Cancel") {
        throw {
          status: 400,
          ok: false,
          message: "Đơn hàng của bạn đã bị hủy trước đó",
        };
      }

      // Kiểm tra trạng thái trước khi hủy
      if (order.status !== "Pending") {
        throw {
          status: 400,
          ok: false,
          message: "Đơn hàng của bạn không thể hủy",
        };
      }

      // Tiến hành cập nhật trạng thái hủy
      order.status = "Cancel";
      order.reasonCancel = cancelReason;
      await order.save(); // Lưu lại thay đổi
      return {
        status: 200,
        ok: true,
        message: "Hủy đơn thành công",
        orderCancel: order,
      };
    } catch (error) {
      throw {
        status: error.status || 500,
        ok: false,
        message: error.message || "Lỗi hệ thống",
      };
    }
  },

  // staff cập nhật đơn hàng
  updateStatusOrderById: async (orderId, status) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        throw {
          status: 400,
          ok: false,
          message: "ID đơn hàng không hợp lệ",
        };
      }

      // Danh sách trạng thái hợp lệ
      const validStatuses = [
        "Pending",
        "Approved",
        "Shipping",
        "Completed",
        "Cancel",
      ];
      if (!validStatuses.includes(status)) {
        throw {
          status: 400,
          ok: false,
          message: "Trạng thái không hợp lệ",
        };
      }

      // Tìm đơn hàng trước khi cập nhật
      const order = await orderModel.findById(orderId);
      if (!order) {
        throw {
          status: 404,
          ok: false,
          message: "Không tìm thấy đơn hàng",
        };
      }

      if (status === order.status) {
        throw {
          status: 400,
          ok: false,
          message: `Trạng thái hiện tại đã là ${status}`,
        };
      }

      // Cập nhật trạng thái
      order.status = status;
      await order.save();

      return {
        status: 200,
        ok: true,
        message: "Đổi trạng thái đơn hàng thành công",
        order,
      };
    } catch (error) {
      throw {
        status: error.status || 500,
        ok: false,
        message: error.message || "Lỗi hệ thống",
      };
    }
  },

  // Lấy thông tin đơn hàng theo trạng thái
  getOrderByStatus: async (customerId, status = null) => {
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
      const query = { customerId };
      if (status) {
        query.status = status;
      }
      const orders = await orderModel.find(query).lean();

      // Nếu không có đơn hàng nào
      if (!orders.length) {
        return {
          ok: true,
          status: 200,
          message: "Không tìm thấy đơn hàng có trạng thái trên",
        };
      }

      // // Kiểm tra xem có đơn hàng nào với status tương ứng không
      // const orderExists = orders.findIndex((order) => order.status === status);
      // if (orderExists === -1) {
      //   return {
      //     ok: true,
      //     status: 200,
      //     message: "Không tìm thấy đơn hàng có trạng thái trên",
      //   };
      // }

      return {
        ok: true,
        status: 200,
        message: "Lấy đơn hàng theo trạng thái thành công",
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

  getOrderByStatusDashboard: async (status = null) => {
    try {
      const orders = await orderModel
        .find({ status })
        .populate("customerId", "-avatar");
      // Nếu không có đơn hàng nào
      if (!orders.length) {
        return {
          ok: true,
          status: 200,
          message: "Không tìm thấy đơn hàng có trạng thái trên",
        };
      }

      return {
        ok: true,
        status: 200,
        message: "Lấy đơn hàng theo trạng thái thành công",
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
};
