const express = require("express");
const router = express.Router();
const PaymentMethod = require("../../models/PaymentMethod");

// Cập nhật hình thức thanh toán
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { _id, name, description, coefficient } = req.body;

  console.log("Request body:", req.body);
  console.log("Request params:", req.params);

  // Kiểm tra thông tin đầu vào
  if (!name) {
    return res
      .status(400)
      .json({ error: "Tên hình thức thanh toán là bắt buộc." });
  }

  if (coefficient && (coefficient <= 0 || isNaN(coefficient))) {
    return res
      .status(400)
      .json({ error: "Hệ số phải là một số hợp lệ lớn hơn 0." });
  }

  try {
    // Tìm và cập nhật hình thức thanh toán
    const paymentMethod = await PaymentMethod.findByIdAndUpdate(
      id,
      {
        name,
        description,
        coefficient: coefficient || 1, // Nếu không có hệ số, gán mặc định 1
      },
      { new: true }
    );

    if (!paymentMethod) {
      return res
        .status(404)
        .json({ error: "Không tìm thấy hình thức thanh toán để cập nhật." });
    }

    // Trả về thông tin cập nhật
    res.json({
      message: "Cập nhật hình thức thanh toán thành công!",
      paymentMethod,
    });
  } catch (error) {
    console.error(error); // Log lỗi để có thông tin hỗ trợ gỡ lỗi
    res
      .status(500)
      .json({ error: "Đã xảy ra lỗi khi cập nhật hình thức thanh toán." });
  }
});

module.exports = router;
