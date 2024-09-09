const express = require("express");
const router = express.Router();
// const authMiddleware = require("../middlewares/auth-middleware");
const {
  allBooks,
  recentBooks,
  bookById,
} = require("../controllers/book-controller");

// getting all the books 
router.get("/all-books", allBooks);

// getting 4 recently added books 
router.get("/recent-Books", recentBooks);

// getting the book by id 
router.get("/book-by-id/:id", bookById);

module.exports = router;
