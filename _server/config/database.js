// server/config/database.js
const mongoose = require("mongoose");
require("dotenv").config(); // Đảm bảo rằng dotenv được load ở đầu file

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      console.error("MONGO_URI không được định nghĩa trong .env");
      process.exit(1); // Nếu MONGO_URI chưa được cấu hình, dừng server
    }

    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000, // Thời gian kết nối tối đa là 5 giây
      socketTimeoutMS: 45000, // Timeout socket
    });

    console.log("Kết nối MongoDB thành công");
  } catch (error) {
    console.error("Kết nối MongoDB thất bại:", error);
    process.exit(1); // Nếu gặp lỗi kết nối, dừng server
  }
};

module.exports = connectDB;
