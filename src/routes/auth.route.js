const express = require("express");
const authController = require("../controllers/auth.controller");
const authRouter = express.Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/getAllUser", authController.getAllUser);
authRouter.get("/getUserById", authController.getUserById);
authRouter.put("/updateUser", authController.updateById);

authRouter.get("/get-customer", authController.getCustomer);
authRouter.get("/get-staff", authController.getStaff);
authRouter.put("/ban-user", authController.banUser);

module.exports = authRouter;
