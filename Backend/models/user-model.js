const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/128/3177/3177440.png",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    favouriteBooks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  { timestamps: true }
);

// hashing the user password
userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hashPassowrd = await bcrypt.hash(user.password, saltRound);
    user.password = hashPassowrd;
  } catch (error) {
    next(error);
  }
});

// comparing the password
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// generating the token using jwt
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        _id: this._id.toString(),
        email: this.email,
        role: this.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
