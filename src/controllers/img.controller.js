const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../configs/cloudinary");
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "SKINCARE",
  allowedFormats: ["jpg", "png", "jpeg"],
  transformation: [{ width: 500, height: 500, crop: "limit" }],
});
const upload = multer({ storage: storage });

const uploadSingle = async (req, res) => {
  try {
    console.log({ file: req.file });
    const file = req.file.path;
    res.send({ file: file });
  } catch (error) {
    return res.status(500).json({ message: "Loi he thong khong tai anh len" });
  }
};
module.exports = {
  upload,
  uploadSingle,
};
