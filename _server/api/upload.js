const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

// Cấu hình lưu trữ hình ảnh
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Thư mục để lưu trữ ảnh
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Đổi tên file để tránh trùng
    cb(null, Date.now() + path.extname(file.originalname)); // Tên file theo thời gian (kèm phần mở rộng)
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn kích thước file (5MB)
  fileFilter: (req, file, cb) => {
    // Hạn chế các loại file chỉ là hình ảnh (jpg, png, gif)
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    }
    cb("Error: File upload only supports images.");
  },
}).single("image"); // "image" là tên trường trong form gửi ảnh

// Endpoint để upload ảnh
router.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).send({ message: err });
    }
    res.status(200).send({
      message: "File uploaded successfully",
      file: `/uploads/${req.file.filename}`, // Trả về đường dẫn file hình ảnh đã tải lên
    });
  });
});

module.exports = router;
