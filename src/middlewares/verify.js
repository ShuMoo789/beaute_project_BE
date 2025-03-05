const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ ok: false, message: "Không có token, vui lòng đăng nhập." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    if (
      !user ||
      !["staff", "customer", "manager"].some((role) =>
        user.role.includes(role)
      )
    ) {
      return res
        .status(403)
        .json({ ok: false, message: "Không có quyền truy cập." });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      ok: false,
      message: "Xác thực không thành công.",
      error: error.message,
    });
  }
};

module.exports = {
  verifyToken,
  verifyStaff: async (req, res, next) => {
    try {
      await verifyToken(req, res, async () => {
        const { user } = req;
        if (
          !user ||
          (!user.role.includes("staff") && !user.role.includes("manager"))
        ) {
          return res
            .status(403)
            .json({ ok: false, message: "Bạn không có quyền truy cập." });
        }
        next();
      });
    } catch (error) {
      res.status(401).json({
        ok: false,
        message: "Xác thực không thành công.",
        error: error.message,
      });
    }
  },
  verifyManager: async (req, res, next) => {
    try {
      await verifyToken(req, res, async () => {
        const { user } = req;
        if (!user || !user.role.includes("Manager")) {
          return res
            .status(403)
            .json({ ok: false, message: "Bạn không có quyền truy cập." });
        }
        next();
      });
    } catch (error) {
      res.status(401).json({
        ok: false,
        message: "Xác thực không thành công.",
        error: error.message,
      });
    }
  },
};
