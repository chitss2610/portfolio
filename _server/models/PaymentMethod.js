const mongoose = require("mongoose");

const paymentMethodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    coefficient: {
      type: Number,
      required: true,
      validate: {
        validator: (value) => value > 0, // Hệ số luôn lớn hơn 0
        message: "Hệ số phải lớn hơn 0.",
      },
    },
  },
  { timestamps: true }
);

const PaymentMethod = mongoose.model("PaymentMethod", paymentMethodSchema);

module.exports = PaymentMethod;
