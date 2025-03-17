const mongoose = require("mongoose");
const RoutineStep = require("../models/routineStep.model");

module.exports = {
  create: async (formData) => {
    try {
      const { stepName, stepNumber, stepDescription, routine, productIds } = formData;

      // Kiểm tra đầu vào
      if (!stepName || !stepNumber || !stepDescription) {
        return Promise.reject({
          status: 400,
          ok: false,
          message: "Bạn cần nhập đầy đủ thông tin",
        });
      }

      // Kiểm tra stepNumber có phải là số hay không
      if (isNaN(stepNumber)) {
        return Promise.reject({
          status: 400,
          ok: false,
          message: "stepNumber phải là một số",
        });
      }

      // Kiểm tra routine có phải là ObjectId hợp lệ không
      if (!mongoose.Types.ObjectId.isValid(routine)) {
        return Promise.reject({
          status: 400,
          ok: false,
          message: "routine không hợp lệ",
        });
      }

      // Kiểm tra xem step đã tồn tại chưa
      const existingStep = await RoutineStep.findOne({ stepNumber, routine });
      if (existingStep) {
        return Promise.reject({
          status: 400,
          ok: false,
          message: "Step đã tồn tại trong routine này",
        });
      }

      // Tạo mới step
      const newStep = await RoutineStep.create({
        stepName,
        stepNumber,
        stepDescription,
        routine,
        productIds,
      });
      await newStep.populate("productIds");
      return {
        status: 201,
        ok: true,
        message: "Tạo step thành công",
        step: newStep,
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
  getAll: async () => {
    const steps = await RoutineStep.find().populate("productIds");
    return steps;
  },
  getById: async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw { 
        status: 400, 
        ok: false, 
        message: "ID không hợp lệ" 
      };
    }

    const step = await RoutineStep.findById(id).populate("productIds");
    if (!step) {
      throw { 
        status: 404, 
        ok: false, 
        message: "Không tìm thấy step" 
      };
    }
    return step;
  },
  update: async (id, formData) => {
    try {
      // Kiểm tra ID có hợp lệ không
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return Promise.reject({
          status: 400,
          ok: false,
          message: "ID không hợp lệ",
        });
      }

      // Kiểm tra xem Step có tồn tại không
      const existingStep = await RoutineStep.findById(id);
      if (!existingStep) {
        return Promise.reject({
          status: 404,
          ok: false,
          message: "Không tìm thấy Step",
        });
      }

      // Cập nhật thông tin Step
      const updatedStep = await RoutineStep.findByIdAndUpdate(id, formData, {
        new: true, // Trả về dữ liệu sau khi cập nhật
        runValidators: true, // Kiểm tra điều kiện validation trong model
      }).populate("productIds");

      return {
        status: 200,
        ok: true,
        message: "Cập nhật Step thành công",
        step: updatedStep,
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
      // Kiểm tra ID có hợp lệ không
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return Promise.reject({
          status: 400,
          ok: false,
          message: "ID không hợp lệ",
        });
      }
  
      // Kiểm tra xem Step có tồn tại không
      const existingStep = await RoutineStep.findById(id);
      if (!existingStep) {
        return Promise.reject({
          status: 404,
          ok: false,
          message: "Không tìm thấy Step",
        });
      }
  
      // Xóa Step
      await RoutineStep.findByIdAndDelete(id);
  
      return {
        status: 200,
        ok: true,
        message: "Xóa Step thành công",
      };
    } catch (error) {
      return Promise.reject({
        status: 500,
        ok: false,
        message: error.message || "Lỗi hệ thống",
      });
    }
  },
};
