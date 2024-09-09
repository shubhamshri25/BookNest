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
  removeFromcart,
  placeOrder,
  orderHistory,
} = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/auth-middleware");

// registering the user
router.post("/register", registerUser);

// logging the user 
router.post("/login", loginUser);

// getting the user by id 
router.get("/:id", authMiddleware, getUser);

// updating the user address
router.put("/update-address/:id", authMiddleware, updateAddress);

// adding the book to favourite 
router.put("/add-To-favourite/:bookId", authMiddleware, addBookToFavourite);

// removing the book from favourite 
router.delete(
  "/delete-from-favourite/:bookId",
  authMiddleware,
  deleteBookFromFavourite
);

// displaying all favourite books
router.get("/show-all-favourite-books/:userId", authMiddleware, getAllFavourite);

// adding the book to cart 
router.put("/add-to-cart/:bookId", authMiddleware, addToCart);

// getting the books from cart
router.get("/get-books-from-cart/:userId", authMiddleware, getAllBooksFromCart);

// removing from cart 
router.delete("/delete-from-cart/:bookId", authMiddleware, removeFromcart);

// placing order 
router.post("/place-order/:userId", authMiddleware, placeOrder);

// getting the order 
router.get("/order-history/:userId", authMiddleware, orderHistory);

module.exports = router;
