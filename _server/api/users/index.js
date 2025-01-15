const express = require("express");
const UserLoginAPI = require("./UserLoginAPI");
const UserRegisterAPI = require("./UserRegisterAPI");

const router = express.Router();

router.post("/login", UserLoginAPI);
router.post("/register", UserRegisterAPI);

module.exports = router;
