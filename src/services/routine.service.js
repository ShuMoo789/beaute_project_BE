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
        steps,
      });

      return {
        status: 201,
        ok: true,
        message: "Tạo Routine thành công",
        data: newRoutine,
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
    return await Routine.find().populate("skinType").populate("steps.products");
  },

  getById: async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw {
        status: 400,
        ok: false,
        message: "ID không hợp lệ",
      };
    }

    const routine = await Routine.findById(id).populate("skinType").populate("steps.products");
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

      // Check if the routine is being set to active
      if (formData.active && formData.active === true) {
        // Check for other active routines with the same skinType
        const activeRoutine = await Routine.findOne({
          skinType: existingRoutine.skinType,
          active: true,
          _id: { $ne: id } // Exclude the current routine from the check
        });

        if (activeRoutine) {
          return Promise.reject({
            status: 400,
            ok: false,
            message: "Đã có một routine khác đang hoạt động cho loại da này.",
          });
        }
      }

      const updatedRoutine = await Routine.findByIdAndUpdate(id, {
        ...formData,
        steps: formData.steps || existingRoutine.steps,
      }, {
        new: true,
        runValidators: true,
      });
      console.log(updatedRoutine)
      return {
        status: 200,
        ok: true,
        message: "Cập nhật Routine thành công",
        data: updatedRoutine,
      };
    } catch (error) {
      console.log(error)
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

      const routines = await Routine.findOne({ 
        skinType: skinTypeId,
        active: true
      })
      .populate({
        path: 'steps.products',
        populate: {
          path: 'category'
        }
      });
      if (!routines) {
        return Promise.resolve({
          status: 200,
          ok: false,
          message: "Không có routine cho loại da này hiện đang được active",
        });
      }
      return routines;
    } catch (error) {
      return Promise.reject({
        status: 500,
        ok: false,
        message: error.message || "Lỗi hệ thống",
      });
    }
  }
};
