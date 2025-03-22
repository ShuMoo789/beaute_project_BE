const mongoose = require("mongoose");
const routineService = require("../services/routine.service");

const routineController = {
  create: async (req, res) => {
    try {
      const { routineName, routineDescription, skinType, steps } = req.body;

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

      if (steps && !Array.isArray(steps)) {
        return res.status(400).json({
          ok: false,
          message: "steps phải là một mảng các ID",
        });
      }

      const newRoutine = await routineService.create({
        routineName,
        routineDescription,
        skinType,
        steps: steps || [],
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
      const routines = await routineService.getAll();
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

      const routine = await routineService.getById(id);
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
      const { routineName, routineDescription, skinType, steps } = req.body;
      console.log("steps", steps);
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          ok: false,
          message: "ID không hợp lệ",
        });
      }

      const updatedRoutine = await routineService.update(id, {
        routineName,
        routineDescription,
        skinType,
        steps: steps || undefined, // Only update steps if provided
      });

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

      await routineService.delete(id);

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

      const routines = await routineService.getBySkinType(skinTypeId);

      return res.status(200).json(routines);
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: error.message || "Lỗi hệ thống",
      });
    }
  },
};

module.exports = routineController;
