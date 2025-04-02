const mongoose = require("mongoose");
const { jwtDecode } = require("jwt-decode");
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
      const users = await authServices.getAllUser();
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
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split(" ")[1];
      const customerId = jwtDecode(token).id;
      const user = await userModel
        .findById(customerId)
        .populate("skinType")
        .select("-password");
      if (!user) {
        return res.status(404).json({
          ok: false,
          message: "Không tìm thấy Người dùng",
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
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split(" ")[1];
      const customerId = jwtDecode(token).id;
      const { name, phone, email, image } = req.body;

      const updatedUser = await userModel.findByIdAndUpdate(
        customerId,
        { name, phone, email, image },
        {
          new: true,
          runValidators: true,
        }
      );
      return res.status(200).json({
        ok: true,
        message: "Cập nhật người dùng thành công",
        user: updatedUser,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: error.message || "Lỗi hệ thống",
      });
    }
  },

  getCustomer: async (req, res) => {
    try {
      const users = await authServices.getCustomer();
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
  getStaff: async (req, res) => {
    try {
      const users = await authServices.getStaff();
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
  banUser: async (req, res) => {
    try {
      const { customerId } = req.body;
      const user = await authServices.banUser(customerId);
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
};
