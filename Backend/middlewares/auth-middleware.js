const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
  try {
    // getting the token from authorization header
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) {
      return res
        .staus(400)
        .json({ message: "No token provided, authorization denied" });
    }

    // decoding the token 
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // getting user based on the decodedToken 
    const user = await User.findById(decodedToken._id).select("-password");

    if (!user) {
      return res.staus(400).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ message: "Invalid token, authorization denied" });
  }
};

module.exports = authMiddleware;
