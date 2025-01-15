const express = require("express");
const router = express.Router();
const PaymentMethod = require("../../models/PaymentMethod");

// Lấy thông tin chi tiết một hình thức thanh toán
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const paymentMethod = await PaymentMethod.findById(id);

    if (!paymentMethod) {
      return res
        .status(404)
        .json({ error: "Hình thức thanh toán không tồn tại." });
    }

    res.status(200).json(paymentMethod);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Đã xảy ra lỗi khi lấy thông tin hình thức thanh toán." });
  }
});

module.exports = router;
