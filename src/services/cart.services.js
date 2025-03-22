const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

module.exports = {
  // Thêm sản phẩm vào giỏ hàng
  addToCart: async (customerId, productId, quantity) => {
    try {
      const product = await Product.findById(productId);
      if (!product) {
        throw {
          status: 400,
          ok: false,
          message: "Sản phẩm không tồn tại!",
        };
      }

      // Tìm giỏ hàng của khách hàng
      let cart = await Cart.findOne({ customerId });

      if (!cart) {
        // Nếu giỏ hàng chưa tồn tại, tạo mới
        cart = await Cart.create({
          customerId,
          products: [{ productId, quantity }],
        });
      } else {
        // Nếu giỏ hàng đã tồn tại, kiểm tra sản phẩm
        const productIndex = cart.products.findIndex((p) =>
          p.productId.equals(productId)
        );

        if (productIndex > -1) {
          // Nếu sản phẩm đã có trong giỏ, tăng số lượng
          cart.products[productIndex].quantity += quantity;
        } else {
          // Nếu sản phẩm chưa có, thêm mới vào giỏ
          cart.products.push({ productId, quantity });
        }

        cart.updatedAt = new Date();
        await cart.save();
      }

      return {
        status: 200,
        ok: true,
        message: "Thêm sản phẩm vào giỏ hàng thành công!",
        data: cart,
      };
    } catch (error) {
      return Promise.reject({
        status: error.status || 500,
        ok: false,
        message: error.message || "Lỗi hệ thống!",
      });
    }
  },

  // Xem thông tin giỏ hàng
  getCart: async (customerId) => {
    try {
      const cart = await Cart.findOne({ customerId }).populate({
        path: "products.productId",
        select: "name price image productDiscount",
      });
  
      if (!cart) {
        return {
          status: 404,
          ok: false,
          message: "Giỏ hàng không tồn tại",
        };
      }
  
      const validProducts = cart.products.filter(item => item.productId);
      
      const totalPrice = validProducts.reduce((total, item) => {
        const product = item.productId;
        const priceAfterDiscount = product.price * (1 - (product.productDiscount || 0) / 100);
        return total + priceAfterDiscount * item.quantity;
      }, 0);
  
      return {
        status: 200,
        ok: true,
        data: {
          products: validProducts.map((item) => ({
            productId: item.productId._id,
            name: item.productId.name,
            image: item.productId.image,
            price: item.productId.price,
            discount: item.productId.productDiscount,
            quantity: item.quantity,
          })),
          totalPrice,
        },
      };
    } catch (error) {
      return Promise.reject({
        status: 500,
        ok: false,
        message: error.message || "Lỗi hệ thống",
      });
    }
  },
  
  // Cập nhật số lượng sản phẩm trong giỏ hàng
  updateProductQuantity: async (customerId, productId, quantity) => {
    try {
      // Kiểm tra sản phẩm có tồn tại không
      const product = await Product.findById(productId);
      if (!product) {
        return Promise.reject({
          status: 404,
          ok: false,
          message: "Sản phẩm không tồn tại",
        });
      }

      // Tìm giỏ hàng của khách hàng
      const cart = await Cart.findOne({ customerId });
      if (!cart) {
        return Promise.reject({
          status: 404,
          ok: false,
          message: "Giỏ hàng không tồn tại",
        });
      }

      // Tìm sản phẩm trong giỏ hàng
      const productIndex = cart.products.findIndex((item) =>
        item.productId.equals(productId)
      );

      if (productIndex === -1) {
        return Promise.reject({
          status: 404,
          ok: false,
          message: "Sản phẩm không tồn tại trong giỏ hàng",
        });
      }

      // Nếu quantity <= 0 thì xóa sản phẩm khỏi giỏ
      if (quantity <= 0) {
        cart.products.splice(productIndex, 1);
      } else {
        // Cập nhật số lượng sản phẩm
        cart.products[productIndex].quantity = quantity;
      }

      // Cập nhật thời gian sửa đổi và lưu lại
      cart.updatedAt = Date.now();
      await cart.save();

      return {
        status: 200,
        ok: true,
        message: "Cập nhật số lượng sản phẩm thành công",
        data: cart,
      };
    } catch (error) {
      return Promise.reject({
        status: 500,
        ok: false,
        message: error.message || "Lỗi hệ thống",
      });
    }
  },

  // Xóa nhiều sản phẩm khỏi giỏ hàng
  removeProductsFromCart: async (customerId, productIds) => {
    try {
      const cart = await Cart.findOne({ customerId });

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
        message: "Xóa sản phẩm khỏi giỏ hàng thành công",
      };
    } catch (error) {
      return Promise.reject({
        status: 500,
        ok: false,
        message: error.message || "Lỗi hệ thống",
      });
    }
  },
};
