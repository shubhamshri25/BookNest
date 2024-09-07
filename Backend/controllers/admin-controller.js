const User = require("../models/user-model");

// getting  all users
const allUser = async (req, res) => {
  try {
    const users = await User.find({});

    if (!users) {
      res.status(400).json({ message: "No users" });
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

module.exports = {
  allUser,
  getUser,
};
