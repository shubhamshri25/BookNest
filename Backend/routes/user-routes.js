const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUser,
  updateAddress,
} = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/auth-middleware");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/:id", authMiddleware, getUser);

router.put("/update-address/:id", authMiddleware, updateAddress);

module.exports = router;
