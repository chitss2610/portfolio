const mongoose = require("mongoose");

// Định nghĩa schema cho khách hàng
const customerSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
      unique: true, // Đảm bảo rằng mã khách hàng là duy nhất
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Đảm bảo rằng email là duy nhất
    },
    phone: {
      type: String,
    },
    paymentMethod: {
      type: mongoose.Schema.Types.ObjectId, // Liên kết tới bảng PaymentMethod
      ref: "PaymentMethod", // Tên model tham chiếu
      required: true, // Bắt buộc phải chọn hình thức thanh toán
    },
  },
  {
    timestamps: true, // Tự động thêm các trường createdAt và updatedAt
  }
);

// Tạo mô hình customer từ schema
const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
