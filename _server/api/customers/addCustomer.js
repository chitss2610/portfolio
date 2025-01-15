const express = require("express");
const router = express.Router();
const Customer = require("../../models/Customer"); // Đảm bảo đường dẫn đúng tới file mô hình Customer
const PaymentMethod = require("../../models/PaymentMethod");

// API thêm khách hàng mới
router.post("/", async (req, res) => {
  const { customerId, name, email, phone, address, paymentMethod } = req.body;

  // Kiểm tra nếu các trường bắt buộc từ phía client không được gửi đầy đủ
  if (!customerId || !name || !email || !paymentMethod) {
    return res.status(400).json({ error: "Vui lòng điền đầy đủ thông tin" });
  }

  try {
    // Kiểm tra nếu khách hàng với mã customerId đã tồn tại
    const existingCustomer = await Customer.findOne({ customerId });
    if (existingCustomer) {
      return res.status(400).json({ error: "Mã khách hàng này đã tồn tại" });
    }

    // Kiểm tra nếu khách hàng với email đã tồn tại
    const existingEmail = await Customer.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ error: "Khách hàng đã tồn tại với email này" });
    }

    // Kiểm tra nếu hình thức thanh toán tồn tại
    const validPaymentMethod = await PaymentMethod.findById(paymentMethod);
    if (!validPaymentMethod) {
      return res
        .status(400)
        .json({ error: "Hình thức thanh toán không hợp lệ." });
    }

    // Tạo khách hàng mới
    const newCustomer = new Customer({
      customerId,
      name,
      email,
      phone,
      paymentMethod,
    });

    // Lưu khách hàng vào cơ sở dữ liệu
    await newCustomer.save();
    console.log("Khách hàng được thêm:", newCustomer);

    res.status(201).json({
      message: "Khách hàng được thêm thành công",
      customer: newCustomer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Đã có lỗi xảy ra khi thêm khách hàng" });
  }
});

module.exports = router;
