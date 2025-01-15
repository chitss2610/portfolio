const cors = require("cors");

const corsMiddleware = cors({
  origin: "*", // Cập nhật theo domain cụ thể nếu cần
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

module.exports = corsMiddleware;
