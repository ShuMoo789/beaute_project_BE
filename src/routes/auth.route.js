const express = require("express");
const authController = require("../controllers/auth.controller");
const authRouter = express.Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/getAllUser", authController.getAllUser);
authRouter.get("/getUserById", authController.getUserById);
authRouter.put("/updateUser", authController.updateById);

module.exports = authRouter;
