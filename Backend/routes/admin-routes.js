const express = require("express");
const router = express.Router();

const { getUser, allUser } = require("../controllers/admin-controller");
const adminMiddlware = require("../middlewares/admin-middleware");
const authMiddleware = require("../middlewares/auth-middleware");

router.get("/:id", authMiddleware, adminMiddlware, getUser);

router.get("/", authMiddleware, adminMiddlware, allUser);

module.exports = router;
