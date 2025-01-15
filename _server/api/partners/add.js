const express = require("express");
const router = express.Router();
const Partner = require("../../models/Partner");

router.post("/", async (req, res) => {
  const { partnerId, name, hourlyRate } = req.body;
  const newPartner = new Partner({ partnerId, name, hourlyRate });

  try {
    const savedPartner = await newPartner.save();
    res.status(201).json(savedPartner);
    console.log("Đã thêm đối tác mới:", savedPartner.name);
  } catch (error) {
    console.error("Lỗi khi thêm đối tác mới:", error);
    res.status(500).json({ error: "Không thể thêm đối tác mới." });
  }
});

module.exports = router;
