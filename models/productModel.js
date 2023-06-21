const mongoose = require("mongoose");


const productSchema = mongoose.Schema({
  barcode: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: [String],
    default: [],
  },
  photo: {
    type: String,
    default: "",
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("products", productSchema);
