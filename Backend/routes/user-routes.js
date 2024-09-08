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

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/:id", authMiddleware, getUser);

router.put("/update-address/:id", authMiddleware, updateAddress);

router.put("/addTofavourite/:bookId", authMiddleware, addBookToFavourite);

router.delete(
  "/delete-from-favourite/:bookId",
  authMiddleware,
  deleteBookFromFavourite
);

router.get("/showAllFavouriteBooks/:userId", authMiddleware, getAllFavourite);

router.put("/add-to-cart/:bookId", authMiddleware, addToCart);

router.get("/get-books-from-cart/:userId", authMiddleware, getAllBooksFromCart);

router.delete("/delete-from-cart/:bookId", authMiddleware, removeFromcart);

router.post("/place-order/:userId", authMiddleware, placeOrder);

router.get("/order-history/:userId", authMiddleware, orderHistory);

module.exports = router;
