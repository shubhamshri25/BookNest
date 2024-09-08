const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUser,
  updateAddress,
  addBookToFavourite,
  deleteBookFromFavourite,
  getAllFavourite,
  addToCart,
  getAllBooksFromCart,
} = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/auth-middleware");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/:id", authMiddleware, getUser);

router.put("/update-address/:id", authMiddleware, updateAddress);

router.put("/addTofavourite/:bookId", authMiddleware, addBookToFavourite);

router.delete(
  "/deleteBookFromFavourite/:bookId",
  authMiddleware,
  deleteBookFromFavourite
);

router.get("/showAllFavouriteBooks/:userId", authMiddleware, getAllFavourite);

router.put("/add-to-cart/:bookId", authMiddleware, addToCart);

router.get("/get-books-from-cart/:userId", authMiddleware, getAllBooksFromCart);

module.exports = router;
