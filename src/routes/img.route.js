const express = require("express");
const { upload, uploadSingle } = require("../controllers/img.controller");

const imgRoute = express.Router();

imgRoute.post("/single", upload.single("img"), uploadSingle);
module.exports = imgRoute;
