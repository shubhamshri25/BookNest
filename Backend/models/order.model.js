const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },

    status: {
      type: String,
      enum: ["Order placed", "Out for delivery", "Delivered", "Cancelled"],
      default: "Order placed",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
