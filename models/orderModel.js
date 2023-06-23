const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  ordernumber: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "products",
    required: true,
  },
  lastprice: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
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
