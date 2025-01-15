// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const uploadRoute = require("./api/upload"); // Import route upload ảnh

// Import kết nối DB
const connectDB = require("./config/database"); // Đảm bảo chính xác đường dẫn

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Kết nối tới MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads")); // Để có thể truy cập ảnh thông qua URL (đọc từ thư mục uploads)

// Sử dụng các route
const registerRoute = require("./api/auth/register");
app.use("/api/auth/register", registerRoute);

const loginRoute = require("./api/auth/login");
app.use("/api/auth/login", loginRoute);

const verifyTokenRoute = require("./api/auth/verifyToken");
app.use("/api/secure", verifyTokenRoute);

//=======================================================
// Router quản lý khách hàng
const addCustomer = require("./api/customers/addCustomer");
app.use("/api/customers/add", addCustomer);

const getCustomersList = require("./api/customers/getCustomersList");
app.use("/api/customers/list", getCustomersList);

const detailCustomer = require("./api/customers/detailCustomer");
app.use("/api/customers/detail", detailCustomer);

const updateCustomer = require("./api/customers/updateCustomer");
app.use("/api/customers/update", updateCustomer);

const deleteCustomerRoute = require("./api/customers/deleteCustomer");
app.use("/api/customers/delete", deleteCustomerRoute);

//=======================================================
// Route quản lý hình thức thanh toán
const addPaymentMethod = require("./api/paymentMethods/addPaymentMethod");
app.use("/api/paymentMethods/add", addPaymentMethod);

const getPaymentMethods = require("./api/paymentMethods/getPaymentMethods");
app.use("/api/paymentMethods", getPaymentMethods);

const detailPaymentMethod = require("./api/paymentMethods/detailPaymentMethods");
app.use("/api/paymentMethods/detail", detailPaymentMethod);

const updatePaymentMethod = require("./api/paymentMethods/updatePaymentMethod");
app.use("/api/paymentMethods/update", updatePaymentMethod);

const deletePaymentMethod = require("./api/paymentMethods/deletePaymentMethod");
app.use("/api/paymentMethods/delete", deletePaymentMethod);

//=======================================================
// Route quản lý đối tác
const partnerRoutes = require("./api/partners/list");
app.use("/api/partners/list", partnerRoutes);

const addPartner = require("./api/partners/add");
app.use("/api/partners/add", addPartner);

//=======================================================
// Route quản lý dự án
const listProjects = require("./api/projects/list");
app.use("/api/projects/list", listProjects);

const addProject = require("./api/projects/add");
app.use("/api/projects/add", addProject);

const countProjects = require("./api/projects/count");
app.use("/api/projects/count", countProjects);

// Lắng nghe cổng 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên http://localhost:${PORT}`);
});
