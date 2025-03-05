const routineStepService = require("../services/routineStep.services");

module.exports = {
  create: async (req, res) => {
    const formData = req.body;
    if (!formData.stepName) {
      return res.status(401).json({ message: "Tên Step bắt buộc nhập" });
    }
    if (!formData.stepNumber) {
      return res.status(401).json({ message: "Số thứ tự step bắt buộc nhập" });
    } 
    if (!formData.stepDescription) {
        return res.status(401).json({ message: "Mô tả bước bắt buộc nhập" });
      } 
    try {
      const data = await routineStepService.create(formData);
      return res.json(data);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const steps = await routineStepService.getAll();
      res.status(200).json({ ok: true, message: "Lấy danh sách step thành công", steps });
    } catch (error) {
      res.status(500).json({ ok: false, message: error.message || "Lỗi hệ thống" });
    }
  },
  getById: async (req, res) => {
    try {
      const step = await routineStepService.getById(req.params.id);
      if (!step) {
        return res.status(404).json({
          ok: false,
          message: "Không tìm thấy step",
        });
      }
      return res.status(200).json({
        ok: true,
        message: "Lấy step thành công",
        step,
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        message: error.message || "Lỗi hệ thống",
      });
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id; // Lấy ID từ params
      const formData = req.body; // Lấy dữ liệu cập nhật từ body

      const data = await routineStepService.update(id, formData);
      return res.status(data.status).json(data);
    } catch (error) {
      return res.status(error.status || 500).json(error);
    }
  },
  delete: async (req, res) => {
    try {
      const result = await routineStepService.delete(req.params.id);
      return res.status(result.status).json(result);
    } catch (error) {
      return res.status(error.status || 500).json(error);
    }
  },
};
