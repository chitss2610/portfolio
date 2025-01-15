const express = require("express");
const router = express.Router();
const Customer = require("../../models/Customer"); // Đảm bảo đường dẫn đúng tới model

// API cập nhật thông tin khách hàng
router.put("/:id", async (req, res) => {
  console.log("Dữ liệu từ frontend:", req.body); // Log dữ liệu từ frontend
  const { customerId, name, email, phone, address, paymentMethod } = req.body;

  try {
    // Kiểm tra nếu khách hàng tồn tại
    const customer = await Customer.findOne({ customerId });
    if (!customer) {
      console.log(`Khách hàng không tồn tại: ${customerId}`);
      return res.status(404).json({ error: "Không tìm thấy khách hàng" });
    }

    // Cập nhật thông tin khách hàng
    customer.name = name;
    customer.email = email;
    customer.phone = phone;
    customer.address = address;
    customer.paymentMethod = paymentMethod;

    // Lưu lại thay đổi
    const updatedCustomer = await customer.save();

    // Console log thông tin khách hàng đã cập nhật
    console.log("Thông tin khách hàng đã cập nhật:", updatedCustomer);

    // Trả về thông tin khách hàng đã cập nhật
    res.status(200).json({
      message: "Cập nhật thông tin khách hàng thành công",
      customer: updatedCustomer,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật thông tin khách hàng:", error);
    res.status(500).json({ error: "Đã xảy ra lỗi trong quá trình cập nhật" });
  }
});

module.exports = router;
