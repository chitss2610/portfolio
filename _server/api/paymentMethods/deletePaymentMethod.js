const express = require("express");
const router = express.Router();
const PaymentMethod = require("../../models/PaymentMethod");

// Xóa hình thức thanh toán
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await PaymentMethod.findByIdAndDelete(id);
    if (!result) {
      return res
        .status(404)
        .json({ error: "Không tìm thấy hình thức thanh toán để xóa." });
    }
    res.json({ message: "Xóa hình thức thanh toán thành công!" });
    console.log("Hình thức thanh toán đã xóa:", result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Đã xảy ra lỗi khi xóa hình thức thanh toán." });
  }
});

module.exports = router;
