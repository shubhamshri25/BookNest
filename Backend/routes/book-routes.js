const express = require("express");
const router = express.Router();
// const authMiddleware = require("../middlewares/auth-middleware");
const {
  allBooks,
  recentBooks,
  bookById,
} = require("../controllers/book-controller");

router.get("/allBooks", allBooks);

router.get("/recentBooks", recentBooks);

router.get("/book-by-id/:id", bookById);

module.exports = router;
