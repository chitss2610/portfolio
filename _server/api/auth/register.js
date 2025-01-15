const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../../models/User"); // Model user, đường dẫn có thể thay đổi
const router = express.Router();

// API đăng ký
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "Email đã được sử dụng!" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Lưu người dùng vào DB
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    return res.status(201).json({
      message: "Đăng ký thành công",
      user: savedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi hệ thống!" });
  }
});

module.exports = router;
