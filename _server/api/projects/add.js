const express = require("express");
const router = express.Router();
const Project = require("../../models/Project"); // Model Dự Án

// Route thêm dự án mới
router.post("/", async (req, res) => {
  try {
    // Lấy dữ liệu từ request body
    const {
      projectId,
      projectNameJP,
      projectNameVN,
      customer,
      partnersandhours, // Lấy đúng tên từ req.body
      quotedAmount,
      deadline,
      projectStatus,
      paymentStatus,
      paymentMonthYear,
    } = req.body;

    // 1. Kiểm tra dữ liệu đầu vào
    if (!projectId || !projectNameJP || !customer) {
      return res.status(400).json({
        message:
          "Thiếu thông tin bắt buộc: projectId, projectNameJP, hoặc customer",
      });
    }

    // 2. Kiểm tra đối tác và giờ báo giá
    if (!Array.isArray(partnersandhours)) {
      return res
        .status(400)
        .json({ message: "Dữ liệu đối tác phải là một mảng" });
    }

    for (const item of partnersandhours) {
      if (!item.partner || typeof +item.hours !== "number") {
        return res.status(400).json({
          message:
            "Mỗi đối tác cần có 'partner' và số giờ báo giá 'hours' hợp lệ",
        });
      }
    }

    // 3. Tạo một dự án mới
    const newProject = new Project({
      projectId,
      projectNameJP,
      projectNameVN,
      customer,
      partnersandhours, // Lưu đúng định dạng dữ liệu
      quotedAmount,
      deadline,
      projectStatus,
      paymentStatus,
      paymentMonthYear,
    });

    // 4. Lưu dự án vào cơ sở dữ liệu
    await newProject.save();

    // Trả về phản hồi thành công
    return res.status(201).json({
      message: "Dự án mới đã được thêm thành công",
      project: newProject,
    });
  } catch (error) {
    // Log lỗi và phản hồi
    console.error("Error while adding new project: ", error);
    return res.status(500).json({
      message: "Có lỗi xảy ra khi thêm dự án",
      error: error.message,
    });
  }
});

module.exports = router;
