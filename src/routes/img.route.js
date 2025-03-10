const express = require("express");
const uploadController = require("../controllers/img.controller");
const imgRoute = express.Router();

imgRoute.post(
  "/upload-img",
  uploadController.upload.single("img"),
  uploadController.uploadSingle
);

imgRoute.post(
  "/upload-imgs",
  uploadController.upload.array("images", 10),
  uploadController.uploadMultipleImages
);

module.exports = imgRoute;
