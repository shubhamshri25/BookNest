const express = require("express");
const router = express.Router();

const {
  getUser,
  allUser,
  addBook,
  updateBook,
  deleteBook,
  allBooks,
} = require("../controllers/admin-controller");
const adminMiddlware = require("../middlewares/admin-middleware");
const authMiddleware = require("../middlewares/auth-middleware");

router.get("/user", authMiddleware, adminMiddlware, allUser);

router.get("/user/:id", authMiddleware, adminMiddlware, getUser);

router.post("/book/add-book", authMiddleware, adminMiddlware, addBook);

router.put("/book/update-book/:id", authMiddleware, adminMiddlware, updateBook);

router.delete(
  "/book/delete-book/:id",
  authMiddleware,
  adminMiddlware,
  deleteBook
);



module.exports = router;
