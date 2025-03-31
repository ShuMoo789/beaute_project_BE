const mongoose = require("mongoose");
const { jwtDecode } = require("jwt-decode");
const DashboardService = require("../services/dashboard.service");


const dashboardController = {
  getOrdersByDate: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;

      // Kiểm tra xem có truyền ngày không
      if (!startDate || !endDate) {
        return res.status(400).json({
          ok: false,
          message: "Vui lòng cung cấp startDate và endDate",
        });
      }

      const result = await DashboardService.getOrderByDate(startDate, endDate);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        message: error.message || "Lỗi hệ thống",
      });
    }
  },
  getOrdersByDateAndStatus: async (req, res) => {
    try {
      const { startDate, endDate, status} = req.query;

      if (!startDate || !endDate) {
        return res.status(400).json({
          ok: false,
          message: "Vui lòng cung cấp startDate và endDate",
        });
      }

      if (!status) {
        return res.status(400).json({
          ok: false,
          message: "Vui lòng cung cấp status",
        });
      }

      const result = await DashboardService.getOrderByDateAndStatus(startDate, endDate, status);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        message: error.message || "Lỗi hệ thống",
      });
    }
  },
  getAccountByRoleByDate: async (req, res) => {
    try {
      const { startDate, endDate, role} = req.query;

      if (!startDate || !endDate) {
        return res.status(400).json({
          ok: false,
          message: "Vui lòng cung cấp startDate và endDate",
        });
      }

      if (!role) {
        return res.status(400).json({
          ok: false,
          message: "vui long cung cấp vai trò",
        });
      }

      const result = await DashboardService.getAccountByRoleByDate(startDate, endDate, role);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        message: error.message || "Lỗi hệ thống",
      });
    }
  },
  getCustomerDoneQuiz: async (req, res) => {
    try {
      const { startDate, endDate} = req.query;

      if (!startDate || !endDate) {
        return res.status(400).json({
          ok: false,
          message: "Vui lòng cung cấp startDate và endDate",
        });
      }

      const result = await DashboardService.getCustomerDoneQuiz(startDate, endDate);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        message: error.message || "Lỗi hệ thống",
      });
    }
  },
};

module.exports = dashboardController;
