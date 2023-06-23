const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  orderNumber: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  lastPrice: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Order", orderSchema);
