const User = require("../models/user-model");
const Book = require("../models/book-model");
const Order = require("../models/order-model");

// getting  all users
const allUser = async (req, res) => {
  try {
    const users = await User.find({});

    if (!users) {
      res.status(400).json({ message: "No users found" });
    }

    res.status(200).json({ message: users });
  } catch (error) {
    res.status(400).json({ message: "No users found" });
  }
};

// getting the user info by id
const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id }).select("-password");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error " });
  }
};

// adding the new book the store
const addBook = async (req, res) => {
  try {
    const { url, title, author, desc, price, language } = req.body;

    if (!url || !title || !author || !desc || !price || !language) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const bookExist = await Book.findOne({ title });

    if (bookExist) {
      return res.status(400).json({ message: "Book already exist" });
    }

    const createdBook = await Book.create({
      url,
      title,
      author,
      desc,
      price,
      language,
    });

    console.log(createdBook);

    res.status(201).json({ message: "Book added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error " });
  }
};

// updating the book
const updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const { url, title, author, desc, price, language } = req.body;

    const bookExist = await Book.findById(bookId);
    if (!bookExist) {
      return res.status(404).json({ message: "Book not found " });
    }

    const updatedBook = { url, title, author, desc, price, language };

    const book = await Book.findByIdAndUpdate(bookId, { $set: updatedBook });

    if (!book) {
      return res.status(400).json({ message: "Failed to update the book" });
    }

    res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error " });
  }
};

// deleting the book
const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(400).json({ message: "Book not found " });
    }

    await Book.findByIdAndDelete(bookId);

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("error while deleting the book: ", error);

    res.status(500).json({ message: "Internal server error " });
  }
};

// getting all the orders that are placed
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate({ path: "book" }) // Populates the book field with book details
      .populate({ path: "user" }) // Populates the user field with user details
      .sort({ createdAt: -1 }); // Sorts orders by creation date in descending order

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json({ message: "Orders fetched successfully", orders });
  } catch (error) {
    console.error("Error retrieving orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// update the status of the order
const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.orderId; // Extract orderId from URL parameters
    const { status } = req.body; // Extract status from request body

    // Validate the status
    const validStatuses = [
      "Order placed",
      "Out for delivery",
      "Delivered",
      "Cancelled",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // Find and update the order status
    const order = await Order.findByIdAndUpdate(orderId, { status });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Respond with the updated order
    res.status(200).json({ message: "Order status updated successfully" });
  } catch (error) {
    console.error("Cannot update the status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  allUser,
  getUser,
  addBook,
  updateBook,
  deleteBook,
  getAllOrders,
  updateOrderStatus,
};
