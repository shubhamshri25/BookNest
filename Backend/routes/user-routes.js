const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddlware = require("../middlewares/admin-middleware");

router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = router;
