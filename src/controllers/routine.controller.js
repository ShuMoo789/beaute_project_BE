const mongoose = require("mongoose");
const Routine = require("../models/routine.model");

const routineController = {
  create: async (req, res) => {
    try {
      const { routineName, routineDescription, skinType } = req.body;

      if (!routineName || !routineDescription || !skinType) {
        return res.status(400).json({
          ok: false,
          message: "Bạn cần nhập đầy đủ thông tin",
        });
      }

      if (!mongoose.Types.ObjectId.isValid(skinType)) {
        return res.status(400).json({
          ok: false,
          message: "skinType không hợp lệ",
        });
      }

      const newRoutine = await Routine.create({
        routineName,
        routineDescription,
        skinType,
        steps: [],
      });

      return res.status(201).json({
        ok: true,
        message: "Tạo Routine thành công",
        routine: newRoutine,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: error.message || "Lỗi hệ thống",
      });
    }
  },

  getAll: async (req, res) => {
    try {
      const routines = await Routine.find().populate("skinType").populate("steps");
      return res.status(200).json({
        ok: true,
        routines,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: error.message || "Lỗi hệ thống",
      });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          ok: false,
          message: "ID không hợp lệ",
        });
      }

      const routine = await Routine.findById(id).populate("skinType").populate("steps");
      if (!routine) {
        return res.status(404).json({
          ok: false,
          message: "Không tìm thấy Routine",
        });
      }

      return res.status(200).json({
        ok: true,
        routine,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: error.message || "Lỗi hệ thống",
      });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { routineName, routineDescription, skinType } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          ok: false,
          message: "ID không hợp lệ",
        });
      }

      const existingRoutine = await Routine.findById(id);
      if (!existingRoutine) {
        return res.status(404).json({
          ok: false,
          message: "Không tìm thấy Routine",
        });
      }

      const updatedRoutine = await Routine.findByIdAndUpdate(
        id,
        { routineName, routineDescription, skinType },
        { new: true, runValidators: true }
      );

      return res.status(200).json({
        ok: true,
        message: "Cập nhật Routine thành công",
        routine: updatedRoutine,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: error.message || "Lỗi hệ thống",
      });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          ok: false,
          message: "ID không hợp lệ",
        });
      }

      const existingRoutine = await Routine.findById(id);
      if (!existingRoutine) {
        return res.status(404).json({
          ok: false,
          message: "Không tìm thấy Routine",
        });
      }

      await Routine.findByIdAndDelete(id);

      return res.status(200).json({
        ok: true,
        message: "Xóa Routine thành công",
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: error.message || "Lỗi hệ thống",
      });
    }
  },

  getBySkinType: async (req, res) => {
    try {
      const { skinTypeId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(skinTypeId)) {
        return res.status(400).json({
          ok: false,
          message: "ID skinType không hợp lệ",
        });
      }

      const routines = await Routine.find({ skinType: skinTypeId })
        .populate("skinType");

      return res.status(200).json({
        ok: true,
        routines,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: error.message || "Lỗi hệ thống",
      });
    }
  },

};

module.exports = routineController;
