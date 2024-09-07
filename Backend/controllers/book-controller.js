const Book = require("../models/book-model");

// getting all the books
const allBooks = async (req, res) => {
  try {
    const books = await Book.find({}).sort({ createdAt: -1 });

    if (!books || books.length === 0) {
      res.status(400).json({ message: "No books found" });
    }

    res.status(200).json({ books });
  } catch (error) {
    res.status(400).json({ message: "No books found" });
  }
};

// get recent added books
const recentBooks = async (req, res) => {
  try {
    const books = await Book.find({}).sort({ createdAt: -1 }).limit(4);

    if (!books || books.length === 0) {
      res.status(400).json({ message: "No books found" });
    }

    res.status(200).json({ books });
  } catch (error) {
    res.status(400).json({ message: "No books found" });
  }
};

module.exports = { allBooks, recentBooks };
