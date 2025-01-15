const express = require("express");
const router = express.Router();
const Partner = require("../../models/Partner");

router.get("/", async (req, res) => {
  try {
    const partners = await Partner.find();
    res.status(200).json(partners);
    console.log(
      "Danh sách đối tác:",
      partners.map((partner) => partner.name)
    );
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đối tác:", error);
    res.status(500).json({ error: "Không thể lấy danh sách đối tác." });
  }
});

module.exports = router;
