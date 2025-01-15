const validateCustomer = (req, res, next) => {
  const { customerId, name, email, paymentMethod } = req.body;

  if (!customerId || typeof customerId !== "number") {
    return res.status(400).json({ error: "Mã khách hàng không hợp lệ." });
  }

  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "Tên khách hàng là bắt buộc." });
  }

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Email khách hàng là bắt buộc." });
  }

  if (!paymentMethod || typeof paymentMethod !== "string") {
    return res
      .status(400)
      .json({ error: "Phương thức thanh toán là bắt buộc." });
  }

  next();
};

module.exports = validateCustomer;
