const User = require("../models/user-model");

// registering user
const registerUser = async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    // checking username length greater than 3
    if (username.length < 4) {
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

    console.log(createdUser);

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

module.exports = {
  registerUser,
  loginUser,
};
