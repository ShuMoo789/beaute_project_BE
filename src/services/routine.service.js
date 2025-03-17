const mongoose = require("mongoose");
const Routine = require("../models/routine.model");

module.exports = {
  create: async (formData) => {
    try {
      const { routineName, routineDescription, skinType, steps } = formData;

      if (!routineName || !routineDescription || !skinType) {
        return Promise.reject({
          status: 400,
          ok: false,
          message: "Bạn cần nhập đầy đủ thông tin",
        });
      }

      if (!mongoose.Types.ObjectId.isValid(skinType)) {
        return Promise.reject({
          status: 400,
          ok: false,
          message: "skinType không hợp lệ",
        });
      }

      const newRoutine = await Routine.create({
        routineName,
        routineDescription,
        skinType,
        steps: steps || [],
      });
      await newRoutine.populate("steps");
      return {
        status: 201,
        ok: true,
        message: "Tạo Routine thành công",
        routine: newRoutine,
      };
    } catch (error) {
      return Promise.reject({
        status: 500,
        ok: false,
        message: error.message || "Lỗi hệ thống",
      });
    }
  },

  getAll: async () => {
    return await Routine.find().populate("skinType").populate("steps");
  },

  getById: async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw {
        status: 400,
        ok: false,
        message: "ID không hợp lệ",
      };
    }

    const routine = await Routine.findById(id).populate("skinType").populate("steps");
    if (!routine) {
      throw {
        status: 404,
        ok: false,
        message: "Không tìm thấy Routine",
      };
    }
    return routine;
  },

  update: async (id, formData) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return Promise.reject({
          status: 400,
          ok: false,
          message: "ID không hợp lệ",
        });
      }

      const existingRoutine = await Routine.findById(id);
      if (!existingRoutine) {
        return Promise.reject({
          status: 404,
          ok: false,
          message: "Không tìm thấy Routine",
        });
      }

      const updatedRoutine = await Routine.findByIdAndUpdate(id, formData, {
        new: true,
        runValidators: true,
      });

      return {
        status: 200,
        ok: true,
        message: "Cập nhật Routine thành công",
        routine: updatedRoutine,
      };
    } catch (error) {
      return Promise.reject({
        status: 500,
        ok: false,
        message: error.message || "Lỗi hệ thống",
      });
    }
  },

  delete: async (id) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return Promise.reject({
          status: 400,
          ok: false,
          message: "ID không hợp lệ",
        });
      }

      const existingRoutine = await Routine.findById(id);
      if (!existingRoutine) {
        return Promise.reject({
          status: 404,
          ok: false,
          message: "Không tìm thấy Routine",
        });
      }

      await Routine.findByIdAndDelete(id);

      return {
        status: 200,
        ok: true,
        message: "Xóa Routine thành công",
      };
    } catch (error) {
      return Promise.reject({
        status: 500,
        ok: false,
        message: error.message || "Lỗi hệ thống",
      });
    }
  },

  getBySkinType: async (skinTypeId) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(skinTypeId)) {
        return Promise.reject({
          status: 400,
          ok: false,
          message: "ID skinType không hợp lệ",
        });
      }

      const routines = await Routine.find({ skinType: skinTypeId })
        .populate("skinType")
        .populate("steps");

      return {
        status: 200,
        ok: true,
        routines,
      };
    } catch (error) {
      return Promise.reject({
        status: 500,
        ok: false,
        message: error.message || "Lỗi hệ thống",
      });
    }
  }
};
