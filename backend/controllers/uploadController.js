const uploadController = require("express").Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.filename);
  },
});

const upload = multer({ storage });

uploadController.post("/image", upload.single("image"), (req, res) => {
  try {
    return res.status(200).json({ message: "File was uploaded successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

module.exports = uploadController;
