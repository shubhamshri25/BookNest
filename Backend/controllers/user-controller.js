const User = require("../models/user-model");

const registerUser = async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "User Already Exist" });
    }

    const createdUser = await User.create({
      username,
      email,
      password,
      address,
    });
    
    console.log(createdUser);

    res
      .status(201)
      .json({ message: "User created Successfully ", createdUser });
  } catch (error) {
    re.status(500).json({message:"Internal server error "})
  }
};

module.exports = {
  registerUser,
};
