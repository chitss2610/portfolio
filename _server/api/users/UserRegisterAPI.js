const User = require("../../models/Users");

const UserRegisterAPI = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Kiểm tra email đã tồn tại
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại." });
    }

    // Tạo và lưu người dùng mới
    const newUser = new User({ email, password });
    await newUser.save();

    res.status(201).json({ message: "Đăng ký thành công.", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server.", error });
  }
};

module.exports = UserRegisterAPI;
