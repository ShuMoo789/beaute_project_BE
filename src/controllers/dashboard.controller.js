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
  getOrderIsPaidByDate: async (req, res) => {
    try {
      const { startDate, endDate, isPaid} = req.query;

      if (!startDate || !endDate) {
        return res.status(400).json({
          ok: false,
          message: "Vui lòng cung cấp startDate và endDate",
        });
      }

      if (!isPaid) {
        return res.status(400).json({
          ok: false,
          message: "Không xác định trạng thái đơn hàng",
        });
      }

      const result = await DashboardService.getOrderIsPaidByDate(startDate, endDate, isPaid);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        message: error.message || "Lỗi hệ thống",
      });
    }
  },
  getCustomerByDate: async (req, res) => {
    try {
      const { startDate, endDate} = req.query;

      if (!startDate || !endDate) {
        return res.status(400).json({
          ok: false,
          message: "Vui lòng cung cấp startDate và endDate",
        });
      }

      const result = await DashboardService.getCustomerByDate(startDate, endDate);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        message: error.message || "Lỗi hệ thống",
      });
    }
  },
  getStaffByDate: async (req, res) => {
    try {
      const { startDate, endDate} = req.query;

      if (!startDate || !endDate) {
        return res.status(400).json({
          ok: false,
          message: "Vui lòng cung cấp startDate và endDate",
        });
      }

      const result = await DashboardService.getStaffByDate(startDate, endDate);

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
