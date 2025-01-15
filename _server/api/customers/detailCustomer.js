const express = require("express");
const router = express.Router();
const Customer = require("../../models/Customer"); // Đảm bảo bạn đã định nghĩa mô hình Customer

// API Lấy thông tin chi tiết khách hàng
router.get("/:customerId", async (req, res) => {
  const { customerId } = req.params;

  try {
    // Tìm kiếm khách hàng theo customerId
    const customer = await Customer.findOne({ customerId });
    console.log(`Lấy thông tin khách hàng ${customer.name} thành công`);
    if (!customer) {
      return res.status(404).json({ error: "Không tìm thấy khách hàng." });
    }

    // Trả về dữ liệu khách hàng
    res.json(customer);
  } catch (error) {
    console.error("Error fetching customer details:", error);
    res
      .status(500)
      .json({ error: "Đã xảy ra lỗi khi tải thông tin khách hàng." });
  }
});

module.exports = router;
