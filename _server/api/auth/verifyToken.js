const jwt = require("jsonwebtoken");

// Middleware kiểm tra token
function verifyToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Token không hợp lệ!" });
  }

  try {
    // Lấy thông tin user từ token
    const decoded = jwt.verify(token, "YOUR_SECRET_KEY"); // Cần chắc chắn secret key ở đây đúng
    req.user = decoded; // Lưu thông tin người dùng vào request object
    next(); // Tiếp tục tới route kế tiếp
  } catch (err) {
    return res.status(401).json({ message: "Token không hợp lệ!" });
  }
}

module.exports = verifyToken;
