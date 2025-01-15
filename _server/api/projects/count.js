const express = require("express");
const router = express.Router();
const Project = require("../../models/Project");
const { startOfMonth, endOfMonth } = require("date-fns");

// Lấy số dự án đã tồn tại của một khách hàng trong tháng hiện tại
router.get("/:customerId", async (req, res) => {
  const { customerId } = req.params;

  try {
    // Lấy số lượng dự án của khách hàng trong tháng hiện tại

    const projectCount = await Project.find({
      customer: customerId, // Đảm bảo customerId là ObjectId hoặc string khớp
      createdAt: {
        $gte: startOfMonth(new Date()), // Lớn hơn hoặc bằng ngày đầu tháng
        $lte: endOfMonth(new Date()), // Nhỏ hơn hoặc bằng ngày cuối tháng
      },
    }).countDocuments();
    console.log("Project count:", projectCount);
    console.log("Customer ID:", customerId);

    res.json({ projectCount });
  } catch (error) {
    console.error("Error counting projects:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
