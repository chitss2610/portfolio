// Trong /routes/auth/login.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const router = express.Router();

// Xử lý đăng nhập
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  // Tìm người dùng theo email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Email không tồn tại" });
  }

  // Kiểm tra mật khẩu
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Mật khẩu không chính xác" });
  }

  // Tạo JWT token
  const token = jwt.sign({ id: user._id }, "YOUR_SECRET_KEY", {
    expiresIn: "1h",
  });

  // Trả lại token cho người dùng
  res.json({ token });
});

module.exports = router;
