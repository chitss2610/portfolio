const express = require("express");
const router = express.Router();
const Project = require("../../models/Project"); // Đảm bảo đã nhập mô hình Project đúng cách

// API GET lấy danh sách dự án
router.get("/", async (req, res) => {
  try {
    const { search, customer, partner, status } = req.query; // Lấy query search từ request

    // Lọc các trường dựa trên tìm kiếm
    // Lọc các trường dựa trên tìm kiếm
    let filter = {};

    if (search) {
      filter = {
        $or: [
          { projectId: { $regex: search, $options: "i" } },
          { projectNameVN: { $regex: search, $options: "i" } },
          { projectNameJP: { $regex: search, $options: "i" } },
        ],
      };

      // Tìm kiếm theo tên khách hàng
      filter["customer.name"] = { $regex: search, $options: "i" };

      // Tìm kiếm theo tên đối tác trong phần partnersandhours
      filter["partnersandhours.partner.name"] = {
        $regex: search,
        $options: "i",
      };
    }

    // Lọc dự án theo khách hàng (nếu có)
    if (customer) {
      const customerArray = customer.split(","); // Chuyển query thành mảng
      filter.customer = { $in: customerArray }; // Tìm khách hàng có trong mảng
    }

    // Lọc dự án theo đối tác (nếu có)
    if (partner) {
      const partnerArray = partner.split(",");
      filter["partnersandhours.partner"] = { $in: partnerArray };
    }

    // Lọc dự án theo trạng thái (nếu có)
    if (status) {
      const statusArray = status.split(",");
      filter.projectStatus = { $in: statusArray };
    }

    // Truy vấn danh sách dự án từ MongoDB, kèm với populate các trường khách hàng và đối tác
    const projects = await Project.find(filter)
      .populate("customer", "name") // Lấy thông tin khách hàng
      .populate("partnersandhours.partner", "name") // Lấy thông tin đối tác trong partnersandhours
      .sort("projectId"); // Sắp xếp dự án theo projectId

    // Trả kết quả về frontend
    res.status(200).json(projects);
    console.log("Lấy danh sách dự án thành công!");
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Lỗi khi lấy danh sách dự án." });
  }
});

module.exports = router;
