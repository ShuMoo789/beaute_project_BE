const mongoose = require("mongoose");
const userModel = require("../models/user.model");
const authServices = require("../services/auth.services");

module.exports = {
  login: async (req, res) => {
    const formData = req.body;
    if (!formData.username) {
      return res.status(401).json({ message: "user bat buoc nhap" });
    }
    if (!formData.password) {
      return res.status(401).json({ message: "mat khau bat buoc nhap" });
    }
    try {
      const data = await authServices.login(formData);
      return res.json(data);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  },
  register: async (req, res) => {
    const formData = req.body;
    if (!formData.username) {
      return res.status(401).json({ message: "user bat buoc nhap" });
    }
    if (!formData.password) {
      return res.status(401).json({ message: "mat khau bat buoc nhap" });
    }
    try {
      const data = await authServices.register(formData);
      return res.json(data);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  },
  getAllUser: async (req, res) => {
    try {
      const users = await userModel.find();
      return res.status(200).json({
        ok: true,
        users,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: error.message || "Lỗi hệ thống",
      });
    }
  },
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          ok: false,
          message: "ID không hợp lệ",
        });
      }

      const user = await userModel.findById(id).populate('skinType').select('-password');

      if (!user) {
        return res.status(404).json({
          ok: false,
          message: "Không tìm thấy Routine",
        });
      }

      return res.status(200).json({
        ok: true,
        user,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: error.message || "Lỗi hệ thống",
      });
    }
  },
  updateById: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, phone, email, avatar } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          ok: false,
          message: "ID không hợp lệ",
        });
      }

      const updatedUser = await userModel.findByIdAndUpdate(
        id,
        { name, phone, email, avatar },
        {
          new: true,
          runValidators: true,
        }
      );
      return res.status(200).json({
        ok: true,
        message: "Cập nhật Routine thành công",
        user: updatedUser,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: error.message || "Lỗi hệ thống",
      });
    }
  },
};
