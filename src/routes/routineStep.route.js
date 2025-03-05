const express = require("express");
const routineStepController = require("../controllers/routineStep.controller");
const verify = require("../middlewares/verify");
const routineStep = express.Router(); // Khai báo router

// Định nghĩa API
routineStep.post("/createRoutineStep", verify.verifyToken, routineStepController.create);
routineStep.get("/getAll", routineStepController.getAll);
routineStep.get("/getByID/:id", routineStepController.getById);
routineStep.put("/update/:id", routineStepController.update);
routineStep.delete("/delete/:id", routineStepController.delete);

module.exports = routineStep; // Xuất module để sử dụng trong app
