const User = require("../models/user.model");
const bcrypt = require("bcrypt");
module.exports = {
  register: (formData) =>
    new Promise(async (resolve, reject) => {
      const saltRounds = 10;

      try {
        const existUser = await User.findOne({ username: formData.username });
        if (existUser) {
          return reject({
            message: "user da ton tai",
            status: 401,
          });
        }
        const hashPassword = bcrypt.hashSync(formData.password, saltRounds);

        const newUser = await User.create({
          ...formData,
          password: hashPassword,
        });
        return resolve({ message: "Dang ky thanh cong", data: newUser });
      } catch (error) {
        return reject({
          message: error.response.data.message || "Loi he thong",
          status: 500,
        });
      }
    }),
};
