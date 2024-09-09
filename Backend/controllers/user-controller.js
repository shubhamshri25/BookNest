const User = require("../models/user-model");
const Book = require("../models/book-model");
const Order = require("../models/order-model");

// registering user
const registerUser = async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    if (!username || !email || !password || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (username.length < 4) {
      // checking username length greater than 3
      return res
        .status(400)
        .json({ message: "Username length must be greater than 3 " });
    }

    // checking if a user name exist
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exist" });
    }

    // checking if a user email  exist
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exist" });
    }

    // checking the password length
    if (password.length <= 5) {
      return res
        .status(400)
        .json({ message: "Password must be greater than 5 " });
    }

    // creating the user after all the checks
    const createdUser = await User.create({
      username,
      email,
      password,
      address,
    });

    // console.log(createdUser);

    res.status(201).json({
      message: "SignUp successfull",
      token: await createdUser.generateToken(),
      id: createdUser._id.toString(),
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error " });
  }
};

// logging the user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: "Invalid credtials" });
    }

    // comparing the password
    const user = await existingUser.comparePassword(password);

    if (user) {
      res.status(200).json({
        message: "Login successfull",
        id: existingUser._id.toString(),
        role: existingUser.role,
        token: await existingUser.generateToken(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error " });
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

// update address
const updateAddress = async (req, res) => {
  try {
    const id = req.params.id;
    const { address } = req.body;

    const user = await User.findByIdAndUpdate(id, { $set: { address } });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    res.status(200).json({ message: "Address updated successfully" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Internal server error" });
  }
};

// adding book to favourite
const addBookToFavourite = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const userId = req.user._id; // Using the user ID from the authMiddleware

    // checking if book is present
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found " });
    }

    // checking if user is present
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found " });
    }

    // checking if the book is already in favourite
    if (user.favouriteBooks.includes(bookId)) {
      return res.status(400).json({ message: "Book already in favorites" });
    }

    await User.findByIdAndUpdate(userId, {
      $addToSet: { favouriteBooks: bookId },
    });

    res.status(200).json({ message: "Book added to favourite" });
  } catch (error) {
    console.error("Error adding book to favorites:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// deleting book from favourite
const deleteBookFromFavourite = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const userId = req.user._id; // Using the user ID from the authMiddleware

    // checking if book is present
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found " });
    }

    // checking if user is present
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found " });
    }

    // checking if the book is already in favourite
    if (!user.favouriteBooks.includes(bookId)) {
      return res.status(400).json({ message: "Book is not in favorites" });
    }

    await User.findByIdAndUpdate(userId, {
      $pull: { favouriteBooks: bookId },
    });

    res.status(200).json({ message: "Book removed from favourite" });
  } catch (error) {
    console.error("Error deleting book from favorites:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// getting all the favourite book of the user
const getAllFavourite = async (req, res) => {
  try {
    const userId = req.user._id;

    // checking if user is present
    const user = await User.findById(userId).populate("favouriteBooks"); // used to replace the objectId with data
    if (!user) {
      return res.status(404).json({ message: "User not found " });
    }

    if (user.favouriteBooks.length === 0) {
      return res.status(404).json({ message: "No favourite books found" });
    }

    res.status(200).json({ favouriteBooks: user.favouriteBooks });
  } catch (error) {
    console.error("Error retrieving favourite books:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// adding the book to cart
const addToCart = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const userId = req.user._id; // Using the user ID from the authMiddleware

    // checking if book is present
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found " });
    }

    // checking if user is present
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found " });
    }

    // checking if the book is already in favourite
    if (user.cart.includes(bookId)) {
      return res.status(400).json({ message: "Book already in cart" });
    }

    await User.findByIdAndUpdate(userId, {
      $addToSet: { cart: bookId },
    });

    res.status(200).json({ message: "Book added to cart" });
  } catch (error) {
    console.error("Error adding book to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get all the books from cart
const getAllBooksFromCart = async (req, res) => {
  try {
    const userId = req.user._id;

    // checking if user is present
    const user = await User.findById(userId).populate("cart");
    if (!user) {
      return res.status(404).json({ message: "User not found " });
    }

    if (user.cart.length === 0) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    const cart = user.cart.reverse(); // for getting the recently added book on top

    res.status(200).json({ cart });
  } catch (error) {
    console.error("Error retrieving books from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// remove the book from cart
const removeFromcart = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const userId = req.user._id; // Using the user ID from the authMiddleware

    // checking if book is present
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found " });
    }

    // checking if user is present
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found " });
    }

    // checking if the book is already in favourite
    if (!user.cart.includes(bookId)) {
      return res.status(400).json({ message: "Book is not in cart" });
    }

    await User.findByIdAndUpdate(userId, {
      $pull: { cart: bookId },
    });

    res.status(200).json({ message: "Book removed from cart" });
  } catch (error) {
    console.error("Error deleting book from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// place order from cart
const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id; // Using the user ID from the authMiddleware

    const user = await User.findById(userId).populate("cart");

    if (!user || !user.cart || user.cart.length === 0) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    const orders = [];

    // looping on all the books prensent in the cart
    for (let book of user.cart) {
      try {
        const order = await Order.create({
          user: userId,
          book: book._id, // Assuming the cart contains book documents after populate
        });

        orders.push(order); // Collect each order in the orders array
      } catch (error) {
        console.error("Error creating order:", error);
      }
    }

    // Update the user's orders array and clear the cart
    await User.findByIdAndUpdate(userId, {
      $push: { orders: { $each: orders.map((order) => order._id) } }, // Add all order IDs to the user's orders array
      $set: { cart: [] }, // Clear the cart after placing orders
    });

    res.status(201).json({
      message: "Order placed successfully",
      orders,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// getting the user's order history
const orderHistory = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).populate({
      path: "orders", // Field containing order references
      populate: {
        path: "book",
      },
    });

    if (!user || !user.orders || user.orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    // fetching the most recent placed order
    const orderData = user.orders.reverse();

    res.status(200).json({ pastOrders: orderData });
  } catch (error) {
    console.error("Error retrieving order history:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
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
};
