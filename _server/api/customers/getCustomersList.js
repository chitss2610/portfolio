const express = require("express");
const router = express.Router();
const Customer = require("../../models/Customer"); // Đảm bảo đường dẫn đúng tới file mô hình Customer

// API Lấy danh sách tất cả khách hàng
router.get("/", async (req, res) => {
  const requestTime = new Date(); // Lấy thời gian hiện tại
  try {
    const customers = await Customer.find().populate("paymentMethod", "name"); // Lấy tất cả khách hàng từ database
    console.log(
      `[${requestTime.toISOString()}] Đã lấy danh sách khách hàng thành công. Tổng số khách hàng: ${
        customers.length
      }`
    );
    res.status(200).json(customers); // Gửi dữ liệu dưới dạng JSON
  } catch (error) {
    console.error(
      `[${requestTime.toISOString()}] Lỗi khi lấy danh sách khách hàng:`,
      error
    );
    res
      .status(500)
      .json({ error: "Đã xảy ra lỗi khi lấy danh sách khách hàng" });
  }
});

module.exports = router;
