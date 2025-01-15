const express = require("express");
const router = express.Router();
const Customer = require("../../models/Customer"); // Mô hình khách hàng MongoDB

// Endpoint xóa khách hàng
router.delete("/:customerId", async (req, res) => {
  const { customerId } = req.params;
  try {
    // Tìm khách hàng theo id và xóa
    const deletedCustomer = await Customer.findOneAndDelete({ customerId });
    if (!deletedCustomer) {
      console.log(`Không tìm thấy khách hàng: ${customerId}`);
      return res
        .status(404)
        .json({ error: `Không tìm thấy khách hàng: ${customerId}` });
    }
    console.log("Khách hàng đã xóa:", deletedCustomer);
    res.status(200).json({
      message: "Xóa khách hàng thành công",
      customer: deletedCustomer,
    });
  } catch (error) {
    console.error("Lỗi khi xóa khách hàng:", error);
    res
      .status(500)
      .json({ error: "Đã xảy ra lỗi trong quá trình xóa khách hàng" });
  }
});

module.exports = router;
