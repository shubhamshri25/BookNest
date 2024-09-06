const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
