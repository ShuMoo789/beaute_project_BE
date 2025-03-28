const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  login: (formData) =>
    new Promise(async (resolve, reject) => {
      try {
        const user = await User.findOne({ username: formData.username }).populate('skinType');

        if (!user) {
          return reject({
            message: "Cần nhập tài khoản và mật khẩu",
            status: 401,
          });
        }

        const isMatch = bcrypt.compareSync(formData.password, user.password);
        if (!isMatch) {
          return reject({
            message: "Sai mật khẩu",
            status: 401,
          });
        }

        const access_token = jwt.sign(
          { id: user._id, role: user.role },
          process.env.API_SECRET,
          { expiresIn: "3h" }
        );

        const userObj = user.toObject();
        delete userObj.password;

        return resolve({
          message: "Đăng nhập thành công",
          access_token,
          data: userObj,
        });
      } catch (error) {
        return reject({
          message: error?.response?.data?.message || "Lỗi hệ thống",
          status: 500,
        });
      }
    }),

  register: (formData) =>
    new Promise(async (resolve, reject) => {
      try {
        const {
          username,
          password,
          name,
          phone,
          email,
          role,
          avatar,
          skinType,
        } = formData;

        if (!username || !password) {
          return reject({
            message: "Username và password là bắt buộc",
            ok: false,
            status: 400,
          });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
          return reject({
            message: "Username đã tồn tại",
            ok: false,
            status: 400,
          });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        let userRole = ["customer"];
        if (role && Array.isArray(role)) {
          userRole = role.filter((r) =>
            ["customer", "staff", "manager"].includes(r)
          );
        }

        const newUser = await User.create({
          username,
          password: hashedPassword,
          name: name || "",
          phone: phone || "",
          email: email || "",
          avatar: avatar || "",
          skinType: skinType || null,
          role: userRole.length > 0 ? userRole : ["customer"],
        });

        return resolve({
          status: 201,
          ok: true,
          message: `Đăng ký thành công`,
          data: {
            _id: newUser._id,
            username: newUser.username,
            name: newUser.name,
            phone: newUser.phone,
            email: newUser.email,
            avatar: newUser.avatar,
            skinType: newUser.skinType,
            role: newUser.role,
          },
        });
      } catch (error) {
        return reject({
          message: error?.message || "Lỗi hệ thống",
          status: 500,
        });
      }
    }),

  getAllUser: () =>
    new Promise(async (resolve, reject) => {
      try {
        const users = await User.find().select("-password"); // Loại bỏ trường password
        resolve({
          ok: true,
          status: 200,
          users,
        });
      } catch (error) {
        reject({
          message: error?.message || "Lỗi hệ thống",
          status: 500,
        });
      }
    }),

  getById: (id) =>
    new Promise(async (resolve, reject) => {
      try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return reject({
            message: "ID không hợp lệ",
            status: 400,
          });
        }
        console.log(user)
        const user = await User.findById(id).populate("skinType").select("-password");
        if (!user) {
          return reject({
            message: "Không tìm thấy người dùng",
            status: 404,
          });
        }

        resolve({
          ok: true,
          status: 200,
          user,
        });
      } catch (error) {
        reject({
          message: error?.message || "Lỗi hệ thống",
          status: 500,
        });
      }
    }),

  updateById: async (id, name, phone, email, avatar) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return Promise.reject({
          message: "ID không hợp lệ",
          status: 400,
        });
      }

      const existingUser = await User.findById(id);
      if (!existingUser) {
        return Promise.reject({
          message: "Không tìm thấy người dùng",
          status: 404,
        });
      }

      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, phone, email, avatar },
        {
          new: true,
          runValidators: true,
        }
      );

      return {
        status: 200,
        ok: true,
        message: "Cập nhật thông tin người dùng thành công",
        user: updatedUser,
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
