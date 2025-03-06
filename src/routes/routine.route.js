const express = require("express");
const routineController = require("../controllers/routine.controller");
const routine = express.Router(); // Khai báo router

// Định nghĩa API
routine.post("/createRoutine", routineController.create);
routine.get("/getAll", routineController.getAll);
routine.get("/getByID/:id", routineController.getById);
routine.put("/update/:id", routineController.update);
routine.delete("/delete/:id", routineController.delete);

module.exports = routine; 
