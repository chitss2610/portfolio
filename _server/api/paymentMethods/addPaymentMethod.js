const express = require("express");
const router = express.Router();
const PaymentMethod = require("../../models/PaymentMethod");

// Thêm hình thức thanh toán
router.post("/", async (req, res) => {
  const { name, description, coefficient } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ error: "Tên hình thức thanh toán là bắt buộc." });
  }

  if (!coefficient || coefficient <= 0) {
    return res.status(400).json({ error: "Hệ số phải lớn hơn 0 và hợp lệ." });
  }

  try {
    const newPaymentMethod = new PaymentMethod({
      name,
      description,
      coefficient,
    });
    await newPaymentMethod.save();
    res.status(201).json({
      message: "Thêm hình thức thanh toán thành công!",
      paymentMethod: newPaymentMethod,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Đã xảy ra lỗi khi thêm hình thức thanh toán." });
  }
});

module.exports = router;
