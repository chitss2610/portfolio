const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectId: {
    type: String,
    unique: true,
    required: true,
    default: function () {
      const year = new Date().getFullYear().toString().slice(2); // Lấy 2 chữ số cuối cùng của năm
      const month = `0${new Date().getMonth() + 1}`.slice(-2); // Lấy tháng hiện tại
      const customerIdPrefix = this.customer
        ? this.customer.customerId.slice(0, 2)
        : "XX"; // Lấy mã khách hàng
      const projectCount = this._projectCount + 1; // Đếm số thứ tự dự án trong tháng
      return `${customerIdPrefix}${year}${month}${String(projectCount).padStart(
        2,
        "0"
      )}`;
    },
  },
  projectNameJP: {
    type: String,
    required: true,
  },
  projectNameVN: {
    type: String,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer", // Dữ liệu khách hàng (liên kết đến Collection "Customer")
    required: true,
  },

  partnersandhours: [
    {
      partner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Partner", // Dữ liệu đối tác (liên kết đến Collection "Partner")
      },
      hours: {
        type: Number,
      },
    },
  ],

  quotedAmount: {
    type: Number,
  },

  deadline: {
    type: Date,
  },
  projectStatus: {
    type: String,
    enum: [
      "Chưa báo giá",
      "Đã báo giá",
      "Đang triển khai",
      "Hoàn thiện",
      "Chỉnh sửa",
      "Từ chối",
    ],
  },
  paymentStatus: {
    type: String,
    enum: ["Chưa thanh toán", "Đã thanh toán"],
  },
  reicipeMonthYear: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Export mô hình
module.exports = mongoose.model("Project", projectSchema);
