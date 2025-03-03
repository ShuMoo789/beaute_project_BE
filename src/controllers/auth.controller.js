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
};
