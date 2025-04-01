const mongoose = require("mongoose");
const User = require("../models/user.model");
const orderModel = require("../models/order.model");
const productModel = require("../models/product.model");
const cartModel = require("../models/cart.model");

module.exports = {
  // Tạo đơn hàng
  createOrder: async (customerId, products, address) => {
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

      // Kiểm tra xem người dùng có điền thông tin địa chỉ không
      if (!address) {
        throw {
          status: 401,
          ok: false,
          message: "Không tìm thấy địa chỉ giao hàng",
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
        address: address,
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
  getAllOrder: async (page = 1, pageSize = 10) => {
    try {
      // Convert page & pageSize to numbers
      page = parseInt(page);
      pageSize = parseInt(pageSize);

      // Calculate skip value
      const skip = (page - 1) * pageSize;

      // Get total count of orders
      const totalOrders = await orderModel.countDocuments();

      // Get paginated orders
      const orders = await orderModel
        .find()
        .populate("customerId", "-image")
        .skip(skip)
        .limit(pageSize);

      return {
        status: 200,
        ok: true,
        message: "Lấy danh sách đơn hàng thành công",
        data: {
          orders,
          pagination: {
            totalItems: totalOrders,
            currentPage: page,
            pageSize: pageSize,
            totalPages: Math.ceil(totalOrders / pageSize)
          }
        }
      };
    } catch (error) {
      return Promise.reject({
        status: error.status || 500,
        ok: false,
        message: error.message || "Lỗi hệ thống khi lấy đơn hàng!"
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
      const order = await orderModel.findById(orderId).populate({
        path: "customerId",
        populate: {
          path: "skinType",
        },
      });
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
  getOrderByStatus: async (customerId, status = null, isPaid = null, page = 1, pageSize = 10) => {
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

      // Convert pagination params to numbers
      page = parseInt(page);
      pageSize = parseInt(pageSize);
      const skip = (page - 1) * pageSize;

      // Build query
      const query = { customerId };
      if (status) {
        query.status = status;
      }
      if (isPaid !== null) {
        query.isPaid = isPaid;
      }

      // Get total count for pagination
      const totalOrders = await orderModel.countDocuments(query);

      // Get paginated orders
      const orders = await orderModel
        .find(query)
        .skip(skip)
        .limit(pageSize)
        .lean();

      // If no orders found
      if (!orders.length) {
        return {
          ok: true,
          status: 200,
          message: `Không tìm thấy đơn hàng có trạng thái trên với trạng thái thanh toán ${query.isPaid}`,
          data: {
            orders: [],
            pagination: {
              totalItems: 0,
              currentPage: page,
              pageSize: pageSize,
              totalPages: 0
            }
          }
        };
      }

      return {
        ok: true,
        status: 200,
        message: "Lấy đơn hàng theo trạng thái thành công",
        data: {
          orders,
          pagination: {
            totalItems: totalOrders,
            currentPage: page,
            pageSize: pageSize,
            totalPages: Math.ceil(totalOrders / pageSize)
          }
        }
      };
    } catch (error) {
      return Promise.reject({
        status: error.status || 500,
        ok: false,
        message: error.message || "Lỗi hệ thống khi lấy đơn hàng!"
      });
    }
  },

  getOrderByStatusDashboard: async (status = null) => {
    try {
      const orders = await orderModel
        .find({ status })
        .populate("customerId", "-image");
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

  getByRole: async (req, res) => {
    try {

      const { role } = req.body;

      const users = await authServices.getByRole(role);
      
      return res.status(200).json({
        ok: true,
        message: "Cập nhật Routine thành công",
        data: users,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: error.message || "Lỗi hệ thống",
      });
    }
  },
};
