const User = require("../models/user-model");
const Book = require("../models/book-model");

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
  } catch (error) {}
};



module.exports = {
  allUser,
  getUser,
  addBook,
  updateBook,
  deleteBook,
};
