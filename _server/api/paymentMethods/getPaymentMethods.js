const express = require("express");
const router = express.Router();
const PaymentMethod = require("../../models/PaymentMethod");

// Lấy danh sách các hình thức thanh toán
router.get("/", async (req, res) => {
  try {
    const paymentMethods = await PaymentMethod.find();
    res.json(paymentMethods);
    console.log("Lấy danh sách hình thức thanh toán thành công.");
  } catch (error) {
    res
      .status(500)
      .json({ error: "Đã xảy ra lỗi khi lấy danh sách hình thức thanh toán." });
  }
});

module.exports = router;
