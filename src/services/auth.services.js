const User = require("../models/user.model"); 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  login: (formData) => 
    new Promise(async (resolve, reject) => {
      try {
        const user = await User.findOne({ username: formData.username });
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

        return resolve({
          message: "Đăng nhập thành công",
          access_token,
          data: user,
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
        const { username, password, name, phone, email, role } = formData;

        if (!username || !password) {
          return reject({
            message: "User và password bắt buộc nhập",
            ok: false,
            status: 400,
          });
        }

        const existingUser = await User.findOne({ username }); // ✅ Sửa lỗi chính tả
        if (existingUser) {
          return reject({
            message: "User đã tồn tại",
            ok: false,
            status: 400,
          });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        let userRole = "customer";

        if (role && ["manager", "staff"].includes(role)) {
          userRole = role;
        }

        await User.create({  // ✅ Đổi từ userModel thành User
          name,
          phone,
          username,
          email,
          password: hashedPassword,
          role: userRole,
        });

        return resolve({
          status: 201,
          ok: true,
          message: `Đăng ký ${userRole} thành công`,
        });

      } catch (error) {
        return reject({
          message: error?.message || "Lỗi hệ thống",
          status: 500,
        });
      }
    }),
};
