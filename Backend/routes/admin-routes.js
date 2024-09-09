const express = require("express");
const router = express.Router();

const {
  getUser,
  allUser,
  addBook,
  updateBook,
  deleteBook,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/admin-controller");
const adminMiddlware = require("../middlewares/admin-middleware");
const authMiddleware = require("../middlewares/auth-middleware");

// getting all users
router.get("/users", authMiddleware, adminMiddlware, allUser);

// getting the user by id
router.get("/user/:id", authMiddleware, adminMiddlware, getUser);

// adding the book
router.post("/book/add-book", authMiddleware, adminMiddlware, addBook);

// updating the book
router.put("/book/update-book/:id", authMiddleware, adminMiddlware, updateBook);

// deleting the book
router.delete(
  "/book/delete-book/:id",
  authMiddleware,
  adminMiddlware,
  deleteBook
);

// getting all the orders placed by the user's
router.get("/order/all-orders", authMiddleware, adminMiddlware, getAllOrders);

// updating the order status
router.put(
  "/order/update-order-status/:orderId",
  authMiddleware,
  adminMiddlware,
  updateOrderStatus
);

module.exports = router;
